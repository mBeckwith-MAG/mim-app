<template>
  <input name="item-search" id="item-search" type="text" v-model="model" placeholder="Search..." />
</template>
<script setup lang="ts">
const model = defineModel() 
</script>