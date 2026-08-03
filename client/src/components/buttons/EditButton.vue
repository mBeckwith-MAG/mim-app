<template>
    <div 
        :class="['border border-border rounded-lg p-2 cursor-pointer text-sm hover:bg-emerald-100 hover:text-black transition-all duration-300', editable]" 
        @click="edit = !edit">
        <WriteIcon height="1em" />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const edit = ref(false)

const editable = computed(() => {
    if(edit.value) {
        return "bg-emerald-400 text-black hover:bg-emerald-600"
    }
    return ''
})
</script>