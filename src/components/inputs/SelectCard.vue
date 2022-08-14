<template>
  <div class="option" :id="id">
    <h4>{{ label }}</h4>
    <p v-if="description">{{description}}</p>
  </div>
</template>

<script>
export default {
  name: "SelectCard",
  props: {
    "id": {
      type: String,
      required: true
    },
    "label": {
      type: String,
      required: true
    },
    "description": {
      type: String
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
h4,
p {
  margin: .5rem;
}
.option {
  border: solid thin #d9d9d9;
  border-radius: 6px;
  background: white;
  padding: .5rem;

  max-width: 20rem;
}
.option:hover {
  border-color: #000;
  cursor: pointer;
}
</style>