<template>
  <div class="grid gap-2">
    <label :for="`form-input-${name}`">{{ displayName }}</label>
    <input
      :type="inputType"
      :id="`form-input-${name}`"
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    default: 'text'
  },
})

const displayName = computed(() => {
    const words: Array<String> = props.name.split(/(?=[A-Z])/)
    return words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
})
</script>
