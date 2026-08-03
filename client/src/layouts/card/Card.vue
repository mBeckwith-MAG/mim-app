<template>
    <div class="card">
        <div>
            <div v-if="$slots.title" class="card-title">
                <slot name="title" />
            </div>
    
            <div v-if="$slots.body" class="card-body">
                <slot name="body" />
            </div>
    
            <div v-if="$slots.footer" class="card-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>