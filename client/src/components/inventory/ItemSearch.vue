<template>
  <input type="text" v-model="model" placeholder="Search..." />
</template>
<script setup lang="ts">
const model = defineModel() 
</script>