<template>
    <Card>
        <template #title>
            <div>
                <slot name="title" />
            </div>
            <ToggleButton v-if="canEdit" @activated="handleActive">
                <WriteIcon height="1em" />
            </ToggleButton>
        </template>
        <template #body>
            <textarea 
                v-if="canEdit"
                :placeholder="!edit ? notes : ''"
                :value="edit ? notes : ''"
                :disabled="!edit"
                @change="$emit('update-value', $event.target)"
                rows="12"
                class="p-4"
            />
            <div v-else class="border border-border rounded-2xl p-4 h-70">
                {{ notes || 'No Notes' }}
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Card from '../../layouts/card/Card.vue'
import ToggleButton from '../buttons/ToggleButton.vue'

const edit = ref(false)

const props = defineProps({
    notes: {
        type: String,
        required: true
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const handleActive = (state: boolean) => {
    edit.value = state
}
</script>