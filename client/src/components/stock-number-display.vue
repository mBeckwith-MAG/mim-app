<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="(item, index) in items"
      class="flex justify-between gap-4 bg-emerald-200 border border-emerald-700 ps-2 pe-2 rounded-full text-emerald-700"
    >
      <span>{{ item }}</span>
      <span class="cursor-pointer" @click="() => $emit('remove-stock', index)">X</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: Array<String>,
})
defineEmits(['remove-stock'])
</script>
