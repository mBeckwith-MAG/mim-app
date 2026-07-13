<template>
  <Column>
    <label for="inventory-store-list">Choose a Store</label>
    <select
      name="selected-store"
      id="inventory-store-list"
      class="ps-2 border border-slate-300 rounded focus:border-2 focus:border-slate-400 focus:outline-none"
      v-model="selectedStore"
      @change="handleSelect"
    >
      <option v-for="store in Stores" :key="store.abbr" :value="store">
        {{ store.name }}
      </option>
    </select>
  </Column>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { InventoryItem } from '../../models/inventory'
import { Stores } from '../../constants/inventory'
import Column from '../../components/column.vue'

const selectedStore: Ref<InventoryItem | null> = ref(null)

const emit = defineEmits(['select-store'])

const handleSelect = () => {
  if (selectedStore) {
    emit('select-store', selectedStore.value)
  }
}
</script>

<style scoped>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 16px;
  padding-right: 40px;
}
</style>
