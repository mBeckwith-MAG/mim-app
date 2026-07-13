<template>
    <div class="grid grid-rows-2 gap-1 text-center p-3">
        <div>
            <slot name="value" />
        </div>
        <small>
            <slot name="label" />
        </small>
    </div>
</template>