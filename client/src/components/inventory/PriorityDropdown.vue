<template>
    <div class="grid gap-2 text-center">
        <select
            :name="`${itemId}-selected-priority`"
            :id="`${itemId}-selected-priority`"
            @change="$emit('update-priority', $event.target)"
            >
            <option v-for="opt in priorityOptions" :key="`prio-${itemId}`" :value="opt" class="text-center">
                {{ opt }}
            </option>
        </select>
        <label :for="`${itemId}-selected-priority`"><small>Priority</small></label>
    </div>
</template>
<script setup lang="ts">
import { priorityOptions } from '../../utilities/constants/inventory';
defineProps({
    itemId: {
        type: String,
        required: true
    }
})
defineEmits(['update-priority'])
</script>