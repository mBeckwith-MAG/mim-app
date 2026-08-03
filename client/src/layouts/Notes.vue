<template>
    <div class="grid p-2">
        <small class="relative top-2 left-2 bg-white dark:bg-slate-700 w-fit text-center font-medium ps-1 pe-1">
            <slot name="label">Notes</slot>
        </small>
        <div class="ps-4 pt-2 border border-slate-300 rounded-2xl h-50">
            <slot name="value" />
        </div>
    </div>
</template>