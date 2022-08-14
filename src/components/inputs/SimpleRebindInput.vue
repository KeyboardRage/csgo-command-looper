<template>
  <div class="command-line" :id="id" :class="{'delete':deleteHighlight}">
    <div :class="{deleteHighlight}">
      <input
          type="text"
          class="cmd-input focus"
          :placeholder="cmdPlaceholder"
          :value="cmdValue"
          @input="$emit('update:cmd-value', $event.target.value)"
          required>
    </div>
    <div :class="{deleteHighlight}">
      <input
          type="text"
          class="inject-input focus"
          :placeholder="injectPlaceholder"
          :value="injectValue"
          @input="$emit('update:inject-value', $event.target.value)"
          required>
    </div>
    <div :class="{deleteHighlight}">
      <input
          type="text"
          class="comment-input"
          :placeholder="commentPlaceholder"
          :value="commentValue"
          @input="$emit('update:comment-value', $event.target.value)"
      >
    </div>
    <button class="delete-command"
            @click="remove"
            @mouseenter="deleteHighlight = true"
            @mouseleave="deleteHighlight = false"
    >Delete</button>
  </div>
</template>

<script>
export default {
  name: "SimpleRebindInput",
  props: {
    "id": {
      type: [String, Number],
      required: true
    },
    "cmdPlaceholder": {
      type: String,
      required: true
    },
    "commentPlaceholder": {
      type: String,
      required: true
    },
    "injectPlaceholder": {
      type: String,
      required: true,
    },
    "cmdValue": {
      type: String
    },
    "commentValue": {
      type: String,
    },
    "injectValue": {
      type: String,
    }
  },
  data() {
    return {
      deleteHighlight: false,
    }
  },
  methods: {
    remove() {
      return this.$emit("remove", this.id);
    },
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
}

.command-line {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: end;
}
.command-line > div {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.command-line button {
  height: min-content;
}

.deleteHighlight {
  opacity: .5;
}
.command-line.delete {
  background: rgba(255, 0, 0, 0.09);
}
</style>