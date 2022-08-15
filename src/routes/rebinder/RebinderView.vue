<template>
  <main class="container">

    <section class="error box" v-if="error.show">
      <h1>{{error.title}}</h1>
      <p>{{error.text}}</p>
      <code>{{error.error}}</code>
    </section>

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
              accept=".log, .txt, .cfg"
          >
        </div>

        <div v-if="file">
          <h3>Select parser</h3>
          <div class="row close-row">
            <SelectCard
                @click.stop="parseFile('position')"
                label="Position"
                id="position"
                description="Reads output of 'getpos' command + includes any team chatbox message if it's in the line below it."
            />
            <SelectCard
                @click.stop="parseFile('rebinder')"
                label="Rebinder Output"
                id="rebinder"
                description="Load an output from this tool into the tool (load saved loops)"
            />
          </div>
        </div>

      </div>
    </section>

    <section class="row">
      <MainInput :value="values.keybind" @onInput="setValue" id="keybind" label="Keybind" placeholder="x" description="The key to press to activate toggle" :required="true" />
      <MainInput :value="values.alias" @onInput="setValue" id="alias" label="Alias" placeholder="do-thing" description="The name you want to use on the aliases, which get an auto-number appended at the end." :required="true" />
      <MainInput :value="values.injection" @onInput="setValue" id="injection" label="Optional: Global injection" placeholder='say_team "next position!"' description='An identical string to add after each command, like say_team "next position!"' />
      <MainInput :value="values.backwards" @onInput="setValue" id="backwards" label="Optional: Backwards Key" placeholder="y" description="Add another key to go to previous backwards in the loop as well" />
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
import RebinderParser from "@/mixins/RebinderParser";

export default {
  name: "RebinderView",
  components: {SimpleRebindInput, MainInput, SelectCard},
  data() {

    return {
      error: {
        show: false,
        title: undefined,
        text: undefined,
        error: undefined,
      },
      values: {
        keybind: undefined,
        alias: undefined,
        injection: undefined,
        parser: undefined,
        backwards: undefined,
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
    /**
     * Set arbitrary key-value
     * @param {{key:String, value:*}} data
     */
    setValue(data) {
      this.values[data.key] = data.value;
    },
    /**
     * Creates a new line
     */
    newLine() {
      this.counter++;
      const id = Math.random().toString(16).slice(2);
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
    /**
     * Remove a line by its ID
     * @param {String} entryId
     */
    removeEntry(entryId) {
      this.entries.delete(entryId);
      if (!this.entries.size) return this.newLine();
    },
    /**
     * Checks if a Command Line is completely empty
     * @param {Object} line
     * @returns {boolean}
     */
    lineEmpty(line) {
      return !line?.command?.value
        && !line?.inject?.value
        && !line?.comment?.value;
    },
    missingMandatory() {
      if (this.lineEmpty(this.entries.values().next().value)) {
        this.error.title = "No Input";
        this.error.text = "There's no commands defined — write some into the fields below."
        this.error.error = undefined;
        this.error.show = true;
        return true;
      }

      if (!this.values.keybind) {
        this.error.title = "Missing Keybind";
        this.error.text = "You must define a keybind. Fill in the Keybind field below."
        this.error.error = undefined;
        this.error.show = true;
        return true;
      }

      if (!this.values.alias) {
        this.error.title = "Missing Alias";
        this.error.text = "You must define an alias for this script. Fill in the Alias field below."
        this.error.error = undefined;
        this.error.show = true;
        return true;
      }

      return false;
    },
    /**
     * Generates the keybind loop and displays it in the output box
     * @param {Boolean} [minified=false] Minify the output. Omits comments and newlines.
     */
    generate(minified=false) {
      this.error.show = false;
      if (this.missingMandatory()) return;

      try {
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
            string += `Alias "${this.values.alias}${i}" "${command};${inject?inject:""}${injection? injection: ""}bind ${this.values.keybind} "${this.values.alias}0";${this.backwards(i, this.entries.size-1)}${minified?"":"\n"}`;
          } else {
            string += `Alias "${this.values.alias}${i}" "${command};${inject?inject:""}${injection? injection: ""}bind ${this.values.keybind} "${this.values.alias}${i+1}";${this.backwards(i, this.entries.size-1)}`;
          }

          strings.push(string);
          i++;
        }

        this.$refs.output.textContent = strings.join(minified ? "":"\n");
      } catch(err) {
        this.error.title = "Error Generating";
        this.error.text = "An unknown error occurred when trying to generate the output."
        this.error.error = err.toString();
        this.error.show = true;
      }
    },
    backwards(index, max) {
      if (!this.values.backwards) return "";
      return `bind ${this.values.backwards} "${this.values.alias}${index ? index-1 : max}"`
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
    /**
     * Cache the file from file data source
     * @param event
     */
    setFile(event) {
      this.file = event.target.files[0];
    },
    /**
     * Parses any file in the file data source cache, and appends any resulting entries
     * @param {('position'|'rebinder')} parserId ID of the parser to apply to the cached file
     */
    parseFile(parserId) {
      this.error.show = false;
      const reader = new FileReader();
      let newEntries = Array();
      reader.readAsText(this.file, "UTF-8");

      reader.onerror = err => {
        this.error.title = "Could Not Read";
        this.error.text = `Something went wrong trying to read the file.`
        this.error.error = err.toString();
        this.error.show = true;
      }

      reader.onload = e => {
        switch(parserId) {
          case "position": {
            try {
              const result = PositionParser(e.target.result);
              newEntries.push(...result.entries);
            } catch(err) {
              this.error.title = "Could Not Parse";
              this.error.text = `Something went wrong trying to parse the file. Is the file a CS:GO Console output?`
              this.error.error = err.toString();
              this.error.show = true;
            }
            break;
          }
          case "rebinder": {
            try {
              const result = RebinderParser(e.target.result);
              for (const key in result.values) {
                this.setValue({key, value: result.values[key]});
              }
              newEntries.push(...result.entries);
            } catch(err) {
              this.error.title = "Could Not Parse";
              this.error.text = `Something went wrong trying to parse the file. Is the file a CS:GO Rebind Tool output?`
              this.error.error = err.toString();
              this.error.show = true;
            }
            break;
          }
          default:
            return;
        }

        // When loading file and first item is blank, remove first item
        if(this.lineEmpty(this.entries.values().next().value)) {
          this.entries = new Map();
          this.counter = 0;
        }

        // Add new entries to existing map
        newEntries.map(e => {
          e.id = Math.random().toString(16).slice(2);
          this.counter++;
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
.close-row {
  justify-content: start;
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
.error p, .error h1 {
  margin: .5rem;
}
.error {
  background: rgba(255, 0, 0, 0.16);
  border-color: rgba(255, 0, 0, 0.7);
}
</style>