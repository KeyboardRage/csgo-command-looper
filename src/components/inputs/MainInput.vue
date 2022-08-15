<template>
  <div class="input-main">
    <label :for="id">{{ label }}</label>
    <p>{{ description }}</p>
    <input
        type="text"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        :required="required"
        :value="value"
        @input="input"
    >
  </div>
</template>

<script>
export default {
  name: "MainInput",
  props :{
    "label": {
      type: String,
      required: true
    },
    "description": {
      type: String,
      required: true
    },
    "placeholder": {
      type: String,
      required: true
    },
    "id": {
      type: String,
      required: true,
    },
    "required": {
      type: Boolean,
      default: false,
    },
    "value": {
      type: [String,undefined]
    },
  },
  methods: {
    input(event) {
      this.$emit("onInput", {key: this.id, value: event.target.value});
      this.currentValue = event.target.value;
    }
  },
}
</script>

<style scoped>

.input-main {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
}
.input-main label {
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.input-main p {
  margin: 0;
  padding: 0;
}
</style>