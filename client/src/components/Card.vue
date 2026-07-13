<template>
    <div class="flex flex-col p-5 card">
        <div v-if="$slots.title" class="flex justify-between gap-4 items-center">
            <slot name="title" />
        </div>

        <div v-if="$slots.body" class="grid gap-2">
            <slot name="body" />
        </div>

        <div v-if="$slots.footer" class="mt-auto pt-4">
            <slot name="footer" />
        </div>
    </div>
</template>