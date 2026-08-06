<template>
    <Card>
        <template #title>Attachments</template>
        <template #body>
            <div class="grid lg:grid-cols-2 gap-sm">
                <div :class="['grid gap-sm 2xl:grid-cols-2', `grid-rows-${attachments.length}`]">
                    <div v-for="(file, index) in attachments" :key="`attachment-${index}`">
                        <a :href="file.url">
                            <div class="border border-border p-2 flex justify-between rounded-2xl items-center">
                                <div>
                                    Attachment {{ index + 1 }}: {{ file.name }}
                                </div>
                                <FileDownloadIcon height="1em" />
                            </div>
                        </a>
                    </div>
                </div>
                <div v-if="canEdit">
                    <FileUploader @update:files="$emit('add-file', $event)" />
                </div>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import type { Attachment } from '../../utilities/types/inventory.ts';
import Card from '../../layouts/card/Card.vue'
import FileUploader from '../FileUploader.vue'

defineProps({
    attachments: {
        type: Array<Attachment>,
        required: true
    },
    hasPayoff: {
        type: Boolean,
        default: false
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

defineEmits(['add-file'])
</script>