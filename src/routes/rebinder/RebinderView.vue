<template>
  <main class="container">

    <section class="row">
      <div class="box">

        <div>
          <label for="data-source">File Source</label>
          <p style="margin:.5rem;">Upload a file to use use as datasource for parsing.</p>
          <input
              type="file"
              name="data-source"
              id="data-source"
              @input="setFile"
              accept=".log, .txt, .html"
          >
        </div>

        <div v-if="file">
          <h3>Select parser</h3>
          <div class="row">
            <SelectCard
                @click.stop="parseFile('position')"
                label="Position"
                id="position"
                description="Reads output of 'getpos' command + includes any team chatbox message if it's in the line below it." />
          </div>
        </div>

      </div>
    </section>

    <section class="row">
      <MainInput :value="values.keybind" @onInput="setValue" id="keybind" label="Keybind" placeholder="x" description="The key to press to activate toggle" :required="true" />
      <MainInput :value="values.alias" @onInput="setValue" id="alias" label="Alias" placeholder="do-thing" description="The name you want to use on the aliases, which get an auto-number appended at the end." :required="true" />
      <MainInput :value="values.injection" @onInput="setValue" id="injection" label="Optional: Global injection" placeholder='say_team "next position!"' description='An identical string to add after each command, like say_team "next position!"' />
    </section>

    <section id="commands-container">
      <div class="row">
        <h3>Console Command:</h3>
        <h3>Optional: Custom Injection:</h3>
        <h3>Optional: Comment:</h3>
      </div>

      <div id="commands" ref="commands">
        <SimpleRebindInput
            v-for="[key,entry] in entries"
            :key="key"
            :id="entry.id"
            @remove="removeEntry"

            :cmd-placeholder="entry.command.placeholder"
            :cmd-value="entry.command.value"
            @update:cmd-value="newValue => entry.command.value = newValue"

            :inject-placeholder="entry.inject.placeholder"
            :inject-value="entry.inject.value"
            @update:inject-value="newValue => entry.inject.value = newValue"

            :comment-placeholder="entry.comment.placeholder"
            :comment-value="entry.comment.value"
            @update:comment-value="newValue => entry.comment.value = newValue"
        />
      </div>

      <div class="new-line-container">
        <button id="new-line" @click="newLine">+ Add Command</button>
        <label for="new-line" class="hotkey-label">Shift+Enter</label>
      </div>
    </section>

    <section id="output-container">
      <div>
        <div>
          <button id="generate" @click="generate(false)">Generate Paste</button>
          <label for="generate" class="hotkey-label">CTRL+Enter</label>
        </div>
        <div>
          <button id="generate-mini" @click="generate(true)">Minify</button>
          <label for="generate-mini" class="hotkey-label">CTRL+SHIFT+Enter</label>
        </div>
      </div>
      <textarea id="output" rows="10" class="new-line-container" ref="output"></textarea>
    </section>
  </main>
</template>

<script>
import MainInput from "@/components/inputs/MainInput";
import SimpleRebindInput from "@/components/inputs/SimpleRebindInput";
import SelectCard from "@/components/inputs/SelectCard";

// Parser
import PositionParser from "@/mixins/PositionParser";

export default {
  name: "RebinderView",
  components: {SimpleRebindInput, MainInput, SelectCard},
  data() {

    return {
      values: {
        keybind: undefined,
        alias: undefined,
        injection: undefined,
        parser: undefined,
      },
      counter: 0,
      entries: new Map(),
      file: undefined,
    };
  },
  mounted() {
    this.newLine();
    window.addEventListener("keydown", this.keyHandler);
  },
  unmounted() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    setValue(data) {
      this.values[data.key] = data.value;
    },
    newLine() {
      const id = this.counter++;
      this.entries.set(id, {
        id,
        command: {
          placeholder: "cl_crosshair_drawoutline 1;",
          value: undefined,
        },
        comment: {
          placeholder: "Do X thing",
          value: undefined,
        },
        inject: {
          placeholder: "say_team 'Did X';",
          value: undefined,
        }
      });

      this.$nextTick(()=> {
        const children = this.$refs.commands.children
        children[children.length-1].querySelector(".focus").focus();
      });
    },
    removeEntry(entryId) {
      this.entries.delete(entryId);
      if (!this.entries.size) return this.newLine();
    },
    lineEmpty(line) {
      return !line?.command?.value
        && !line?.inject?.value
        && !line?.comment?.value;
    },
    generate(minified=false) {
      if (this.lineEmpty(this.entries.get(0))) return;

      const strings = [`bind ${this.values.keybind} "${this.values.alias}0";${minified?"":"\n"}`];
      let i = this.counter = 0;

      for (const [,entry] of this.entries) {
        let command = entry.command.value;
        let inject = entry.inject.value;
        const comment = entry.comment.value;

        let string = "";

        if (!minified && comment) {
          if (i) string = "\n";
          string += "// "+comment.trim()+"\n";
        }
        if (command.endsWith('"')) command = command.slice(0,-1);
        if (inject && !inject.endsWith(";")) inject += ";";

        let injection = this.values.injection;
        if (injection && !injection.endsWith(";")) injection += ";";

        if (i === this.entries.size-1) {
          string += `Alias "${this.values.alias}${i}" "${command};${inject?inject:""}${injection? injection: ""}bind ${this.values.keybind} "${this.values.alias}0";${minified?"":"\n"}`;
        } else {
          string += `Alias "${this.values.alias}${i}" "${command};${inject?inject:""}${injection? injection: ""}bind ${this.values.keybind} "${this.values.alias}${i+1}";`;
        }

        strings.push(string);
        i++;
      }

      this.$refs.output.textContent = strings.join(minified ? "":"\n");
    },
    /**
     * Handles all key presses for shortcuts
     * @param {KeyboardEvent} e
     */
    keyHandler(e) {
      if (e.code!=="Enter") return;

      if (e.ctrlKey && e.shiftKey) {
        return this.generate(true);
      }

      if (e.shiftKey) {
        return this.newLine();
      }

      if (e.ctrlKey) {
        return this.generate();
      }
    },
    setFile(event) {
      this.file = event.target.files[0];
    },
    parseFile(parserId) {
      const reader = new FileReader();
      let newEntries = Array();
      reader.readAsText(this.file, "UTF-8");

      reader.onload = e => {
        switch(parserId) {
          case "position": {
            newEntries.push(...PositionParser(e.target.result));
            break;
          }
          default:
            return;
        }

        // When loading file and first item is blank, remove first item
        if(this.lineEmpty(this.entries.get(0))) {
          this.entries = new Map();
          this.counter = 0;
        }

        // Add new entries to existing map
        newEntries.map(e => {
          e.id = this.counter++;
          this.entries.set(e.id, e);
        });
      }
    }
  }
}
</script>

<style scoped>
label:not(.hotkey-label) {
  font-weight: bold;
}
.container {
  margin: 1rem;
}
dt {
  font-weight: bold;
}

.row > * {
  flex: 1;
  margin-bottom: 1rem;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

#output-container,
#commands-container {
  background: white;
  border-radius: 6px;
  margin: 1rem 0;
  padding: 1rem 1rem 2rem 1rem;
  border: solid thin #d9d9d9;
}

.hotkey-label {
  font-style: italic;
  color: #999999;
}
.new-line-container {
  margin-top: 2rem;
}
#output {
  width: 100%;
  font-family: "JetBrains Mono", monospace;
}
.box {
  border: solid thin #d9d9d9;
  border-radius: 6px;
  background: white;
  padding: .5rem;
}
button:hover {
  cursor: pointer;
}
</style>