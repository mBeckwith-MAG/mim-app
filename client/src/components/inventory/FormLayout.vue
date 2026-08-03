<template>
    <div class="form-grid">
        <div :class="['top-row', { 'grid-cols-3': showPayoff }]">
            <div class="form-section">
                <Card>
                    <template #title>Personal Information</template>
                    <template #body>
                        <div class="personal-info">
                            <slot name="personal-info" />
                        </div>
                    </template>
                </Card>  
            </div>
            <div class="form-section">
                <Card>
                    <template #title>Vehicle Information</template>
                    <template #body>
                        <div class="vehicle-info">
                            <slot name="vehicle-info" />
                        </div>
                    </template>
                </Card>
            </div>
            <div v-if="showPayoff" class="form-section">
                <Card>
                    <template #title>Payoff Information</template>
                    <template #body>
                        <div class="payoff-info">
                            <slot name="payoff-info" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
        <div class="bottom-row">
            <div class="form-section">
                <Card>
                    <template #title>Stock Numbers</template>
                    <template #body>
                        <div class="stock-numbers">
                            <slot name="stock-numbers" />
                        </div>
                    </template>
                </Card>
            </div>
            <div class="form-section">
                <Card>
                    <template #title>Additional Information</template>
                    <template #body>
                        <div class="additional-info">
                            <slot name="additional-info" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Card from '../../layouts/card/Card.vue'
defineProps({
    showPayoff: {
        type: Boolean,
        default: false
    }
})
</script>