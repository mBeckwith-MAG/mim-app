<template>
  <div>
    <Navigation class="sticky top-0 z-50 bg-bg" showAddVehicle showInventoryKey />
    <div v-if="loading" class="text-2xl text-center p-5">...Loading</div>
    <div v-else>
      <div>
        <FilterBar :submitters="submitters" v-model="searchQuery" horizontal />
      </div>

      <div>
        <div v-if="filteredItems && filteredItems.length" class="grid lg:grid-cols-2 xl:grid-cols-3 gap-md m-md mt-12">
          <ItemCard v-for="item in filteredItems" :item="item" :key="item.UID" />
        </div>
        <div v-else class="text-2xl">No Items</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue'
import { BOARDS, BASE_URL } from '../../utilities/constants/inventory.ts'
import { InventoryItem } from '../../utilities/models/inventory.ts'
import type { Item } from '../../utilities/types/inventory.ts'
import ItemCard from '../../components/inventory/ItemCard.vue'
import Navigation from '../../components/global/Navigation.vue'
import FilterBar from '../../components/inventory/FilterBar.vue'


const loading = ref(true)
const boardItems: Ref<InventoryItem[]> = ref([])
const searchQuery = ref('')
// import mondaySdk from 'monday-sdk-js'
// const monday = mondaySdk()

onMounted(async () => {
  // const contextRes = await monday.get("context");
  // const context = (contextRes as any)?.data;

  // const BASE_URL = context?.appVersion?.mondayCodeHostingUrl
  //   ? `${context.appVersion.mondayCodeHostingUrl}/api/`
  //   : DEV_URL; // fallback for dev


  const { items } = await fetch(`${BASE_URL}boards/${BOARDS.inventory}`).then(res => res.json())
  boardItems.value = items.map((item: Item) => {
    return new InventoryItem(item)
  }).sort((a: InventoryItem, b: InventoryItem) => {
    if(a.CREATED_DATE?.text && b.CREATED_DATE?.text)
      return a.CREATED_DATE?.text?.localeCompare(b.CREATED_DATE?.text)
  })
  loading.value = false
})

const submitters = computed(() => {
  return [
    ...new Set(
      boardItems.value
        .map(item => item.SUBMIT_BY.text)
        .filter((name): name is string => !!name)
    )
  ];
});

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) return boardItems.value

  return boardItems.value.filter((item: InventoryItem) => {
    return Object.values(item).some(val => {
      if (!val) return false

      if (typeof val === 'string') {
        return val.toLowerCase().includes(query)
      }

      if (typeof val === 'object' && 'text' in val && typeof val.text === 'string') {
        return val.text.toLowerCase().includes(query)
      }

      return false
    })
  })
})
</script>