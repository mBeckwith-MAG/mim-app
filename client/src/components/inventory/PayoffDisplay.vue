<template>
    <Card>
        <template #title>
            <div>Payoff Information</div>
            <ToggleButton v-if="canEdit" @activated="edit = !edit">
                <WriteIcon height="1em" />
            </ToggleButton>
        </template>
        <template #body>
            <DisplayData>
                <template #label>Lien Holder</template>
                <template #value>
                    <slot name="lien-holder" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Payoff Amount</template>
                <template #value>
                    <slot name="payoff-amount" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Per Diem</template>
                <template #value>
                    <slot name="per-diem" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Good Till</template>
                <template #value>
                    <slot name="good-till" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Check Status</template>
                <template #value>
                    <slot name="check-status" />
                </template>
            </DisplayData>
            <DisplayData>
                <template #label>Payment Tracking</template>
                <template #value>
                    <slot name="payment-tracking" />
                </template>
            </DisplayData>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Card from '../../layouts/card/Card.vue'
import DisplayData from '../../layouts/DisplayData.vue'
import ToggleButton from '../buttons/ToggleButton.vue'

const edit = ref(false)

const props = defineProps({
    canEdit: {
        type: Boolean,
        default: false
    }
})
</script>