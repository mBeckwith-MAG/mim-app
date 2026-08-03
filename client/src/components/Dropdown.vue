<template>
    <div class="grid gap-2">
        <label :for="`dropdown-${name}`">{{ displayName }}</label>
        <select :id="`dropdown-${name}`" v-model="model">
            <option value=""></option>
            <option v-for="(option, index) in options" :key="`${name}-option-${index}`" :value="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel()

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    options: {
        type: Array as () => String[],
        required: true
    }
})

const displayName = computed(() => {
    const words: Array<String> = props.name.split(/(?=[A-Z])/)
    return words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
})
</script>