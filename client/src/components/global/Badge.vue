<template>
    <div class="badge">
        <div>
            <slot />
        </div>
        <div class="cursor-pointer" @click="() => $emit('remove-stock')">X</div>
    </div>
</template>
<script setup lang="ts">
defineEmits(['remove-stock'])
</script>