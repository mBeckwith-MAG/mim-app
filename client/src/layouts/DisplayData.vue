<template>
    <div class="grid grid-cols-2 p-2 items-center">
        <div>
            <slot />
        </div>
        <div class="text-end">
            <div class="truncate" v-if="!canEdit">
                {{ model || altText }}
            </div>
            <input v-else v-model="model" :type="inputType" />
        </div>
    </div>
</template>
<script setup lang="ts">
const model = defineModel()

defineProps({
    canEdit: {
        type: Boolean,
        default: false
    },
    altText: {
        type: String,
        default: '-'
    },
    inputType: {
        type: String,
        default: 'text'
    }
})
</script>