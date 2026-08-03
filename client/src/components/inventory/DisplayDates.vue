<template>
    <Card>
        <template #title>Item Dates</template>
        <template #body>
            <DisplayData>
                <template #label>Created On</template>
                <template #value>
                    <slot name="created-date" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Started On</template>
                <template #value>
                    <slot name="start-date" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Completed On</template>
                <template #value>
                    <slot name="completed-date" />
                </template>
            </DisplayData>
        </template>
    </Card>
</template>
<script setup lang="ts">
import Card from '../../layouts/card/Card.vue'
import DisplayData from '../../layouts/DisplayData.vue'
</script>