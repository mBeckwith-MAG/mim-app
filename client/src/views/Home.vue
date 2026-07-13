<template>
  <div>
    <div v-if="loading" class="text-2xl text-center p-5">...Loading</div>
    <div v-else>
      <div class="grid grid-cols-6 p-4">
        <Card class="sticky top-30 h-fit">
          <template #body>
              <ItemSearch class="border border-border-light rounded-2xl p-2 w-full focus:outline-none focus:border-2 focus:border-border-light" v-model="searchQuery" />
              <FilterDropdown filterName="carType" :options="carTypeOptions" class="mt-10" v-model="searchQuery" />
              <FilterDropdown filterName="status" :options="statusOptions" class="mt-4" v-model="searchQuery" />
              <FilterDropdown filterName="submitBy" :options="submitters" class="mt-4" v-model="searchQuery" />
              <FilterDropdown filterName="carOrigin" :options="[ ...newOriginOptions, ...usedOriginOptions ]" class="mt-4" v-model="searchQuery" />
              <FilterDropdown filterName="titleOrPayoff" :options="titleOrPayoffOptions" class="mt-4" v-model="searchQuery" />
          </template>
        </Card>
        <div class="col-span-5">
          <div v-if="filteredItems && filteredItems.length" class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 m-4">
            <ItemCard v-for="item in filteredItems" :item="item" :key="item.uid" />
          </div>
          <div v-else class="text-2xl">No Items</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue';
import { BASE_URL, BOARDS, carTypeOptions, statusOptions, newOriginOptions, usedOriginOptions, titleOrPayoffOptions } from '../constants/inventory';
import { InventoryItem } from '../models/inventory';
import type { Item } from '../types/inventory';
import Card from '../components/Card.vue';
import ItemCard from '../components/inventory/ItemCard.vue';
import ItemSearch from '../components/ItemSearch.vue';
import FilterDropdown from '../components/FilterDropdown.vue';

const loading = ref(true)
const boardItems: Ref<InventoryItem[]> = ref([])
const searchQuery = ref('')

onMounted(async () => {
  const { items } = await fetch(`${BASE_URL}${BOARDS.inventory}`).then(res => res.json())
  boardItems.value = items.map((item: Item) => {
    return new InventoryItem(item)
  }).sort((a: InventoryItem, b: InventoryItem) => {
    if(a.start_date?.text && b.start_date?.text)
      return a.start_date?.text?.localeCompare(b.start_date?.text)
  })
  loading.value = false
})

const submitters = computed(() => {
  return [...new Set(boardItems.value.map(item => item.name))]
})

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return boardItems.value;

  return boardItems.value.filter((item: InventoryItem) => {
    return Object.values(item).some(val => {
      if (!val) return false;

      if (typeof val === 'string') {
        return val.toLowerCase().includes(query);
      }

      if (typeof val === 'object' && 'text' in val && typeof val.text === 'string') {
        return val.text.toLowerCase().includes(query);
      }

      return false;
    });
  });
});
</script>