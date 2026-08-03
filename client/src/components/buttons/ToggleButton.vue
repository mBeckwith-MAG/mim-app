<template>
    <div 
        :class="['btn max-h-8 w-fit hover:bg-emerald-100 hover:text-black transition-all duration-300', activated]" 
        @click="handleActive">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const active = ref(false)

const emits = defineEmits(['activated'])

const activated = computed(() => {
    if(active.value) {
        return "bg-emerald-400 text-black hover:bg-emerald-600"
    }
    return ''
})

const handleActive = () => {
    active.value = !active.value
    emits('activated', active.value)
}
</script>