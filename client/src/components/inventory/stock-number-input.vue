<template>
  <div class="stock-number-input">
    <input
      type="text"
      id="stock-number-input"
      v-model="stockNumber"
      @keyup.enter="handleEmit"
    />
    <button
      @click="handleEmit"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

const stockNumber: Ref<String | null> = ref(null)

const emit = defineEmits(['add-stock-number'])

const handleEmit = () => {
  emit('add-stock-number', stockNumber.value)
  stockNumber.value = null
}
</script>