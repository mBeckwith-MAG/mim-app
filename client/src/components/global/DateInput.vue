<template>
    <div class="grid grid-cols-2 p-2 items-center">
        <div>
            <slot />
        </div>
        <input 
            type="text" 
            :placeholder="currentDate" 
            onfocus="(this.type='date')" 
            onblur="if(!this.value) this.type='text'"
            v-model="model"
        >
    </div>
</template>
<script setup lang="ts">
const model = defineModel()

defineProps({
    currentDate: {
        type: String,
        required: true
    }
})
</script>