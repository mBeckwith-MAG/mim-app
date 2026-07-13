<template>
  <Row>
    <Column>
      <label for="stock-number-input">Stock Number</label>
      <input
        type="text"
        id="stock-number-input"
        v-model="stockNumber"
        class="ps-2 border rounded focus:border-2 focus:outline-none"
      />
      <button
        @click="handleEmit"
        class="btn"
      >
        +
      </button>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Column from '../column.vue'
import Row from '../row.vue'

const stockNumber: Ref<String | null> = ref(null)

const emit = defineEmits(['add-stock-number'])

const handleEmit = () => {
  emit('add-stock-number', stockNumber.value)
  stockNumber.value = null
}
</script>
