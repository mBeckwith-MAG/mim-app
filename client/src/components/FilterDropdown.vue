<template>
    <div class="grid gap-2">
        <label :for="`filterDropdown-${filterName}`">{{ displayName }}</label>
        <select :id="`filterDropdown-${filterName}`" v-model="model">
            <option value=""></option>
            <option v-for="(option, index) in options" :key="`${filterName}-option-${index}`" :value="option.toLowerCase()">{{ option }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel()

const props = defineProps({
    filterName: {
        type: String,
        required: true
    },
    options: {
        type: Array as () => String[],
        required: true
    }
})

const displayName = computed(() => {
    const words: Array<String> = props.filterName.split(/(?=[A-Z])/)
    return words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
})
</script>