<template>
    <Card :class="statusColor">
        <template #title>
            <CardData class="row-span-3 col-span-2">
                <template #value>{{ item.STOCK_NUMBER }}</template>
                <template #label>
                    <div class="relative -top-2">
                        <small>Stock Number</small>
                    </div>
                </template>
            </CardData>
            <CardData class="row-span-3 col-span-4">
                <template #value>{{ item.CREATED_DATE?.text ? convertDate(item.CREATED_DATE.text) : '' }}</template>
                <template #label>
                    <div class="relative -top-2">
                        <small>Item Submit Date</small>
                    </div>
                </template>
            </CardData>
        </template>
        <template #body>
            <CardSection>
                <CardData>
                    <template #value>{{ item.CAR_TYPE?.text }}</template>
                    <template #label>Car Type</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.PRIORITY?.text }}</template>
                    <template #label>Priority</template>
                </CardData>
                <CardData>
                    <template #value><input type="checkbox" :checked="isChecked" class="reversal-checkbox" disabled /></template>
                    <template #label>Reversal?</template>
                </CardData>
            </CardSection>
            <CardSection class="justify-center gap-10">
                <CardData>
                    <template #value>{{ item.NEW_ORIGIN?.text === null ? item.USED_ORIGIN?.text : item.NEW_ORIGIN?.text }}</template>
                    <template #label>Car Origin</template>
                </CardData>
                <CardData v-if="item.USED_ORIGIN?.text != null && item.USED_ORIGIN?.text?.includes('Wholesale')">
                    <template #value>{{ item.USED_ORIGIN?.text?.includes('Sale') ? item.WHOLESALE_TRANSACTION_METHOD?.text : item.AUCTION_TRANSACTION_METHOD?.text }}</template>
                    <template #label>Transaction Method</template>
                </CardData>
                <CardData v-if="item.USED_ORIGIN?.text?.includes('Street')">
                    <template #value>{{ item.TITLE_OR_PAYOFF?.text }}</template>
                    <template #label>Title or Payoff</template>
                </CardData>
                <CardData v-if="item.TITLE_OR_PAYOFF?.text?.includes('Title')">
                    <template #value>{{ item.TITLE_STATUS?.text }}</template>
                    <template #label>Title Status</template>
                </CardData>
            </CardSection>
            <CardSection v-if="item.TITLE_OR_PAYOFF?.text === 'Payoff'">
                <CardData>
                    <template #value>{{ item.PAYOFF_AMOUNT?.text }}</template>
                    <template #label>Payoff Amount</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.LIEN_HOLDER?.text }}</template>
                    <template #label>Lien Holder</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.PER_DIAM?.text }}</template>
                    <template #label>Per Diam</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.GOOD_TILL_DATE?.text ? convertDate(item.GOOD_TILL_DATE.text) : '' }}</template>
                    <template #label>Good Till</template>
                </CardData>
            </CardSection>


                <Notes v-if="item.FORM_NOTES && item.FORM_NOTES.text !== ''">
                    <template #label>Form Notes</template>
                    <template #value>{{ item.FORM_NOTES?.text }}</template>
                </Notes>

                <Notes v-if="item.INVENTORY_NOTES && item.INVENTORY_NOTES.text !== ''">
                    <template #label>Inventory Notes</template>
                    <template #value>{{ item.INVENTORY_NOTES?.text }}</template>
                </Notes>
        </template>
        <template #footer>
                <div class="flex justify-evenly">
                    <CardData>
                        <template #value>{{ item.PAYMENT_TRACKING?.text || '-' }}</template>
                        <template #label>Payoff Tracking</template>
                    </CardData>
                    <CardData>
                        <template #value>{{ item.CHECK_STATUS?.text || '-' }}</template>
                        <template #label>Check Status</template>
                    </CardData>
    
                    <CardData v-if="item.END_DATE.text">
                        <template #value>{{ item.END_DATE?.text ? convertDate(item.END_DATE.text) : '-' }}</template>
                        <template #label>Completed</template>
                    </CardData>
                     <PriorityDropdown v-if="item.STATUS.text !== 'Done'" :item-id="item.UID" @update-priority="handleUpdatePrio" class="relative -top-3" />
                </div>
                <div class="flex justify-end gap-sm">
                    <RouterLink :to="`/inventory/edit/${item.UID}`">
                        <LinkAltIcon height="1.5em" class="cursor-pointer hover:text-slate-500 transition-all" />
                    </RouterLink>
                </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { InventoryItem } from '../../utilities/models/inventory.ts'
import Card from '../../layouts/card/Card.vue'
import CardData from '../../layouts/card/CardData.vue'
import Notes from '../../layouts/Notes.vue'
import CardSection from '../../layouts/card/CardSection.vue'
import PriorityDropdown from './PriorityDropdown.vue'

const props = defineProps({
    item: {
        type: Object as () => InventoryItem,
        required: true
    }
})

const statusColor = computed(() => {
    switch(props.item.STATUS?.text) {
        case 'Done': return 'border-l-20 border-l-emerald-400'
        case 'Reject': return 'border-l-20 border-l-red-400'
        case 'Working':
        case 'Updated': return 'border-l-20 border-l-amber-400'
        default: return 'border-l-20 border-l-gray-400'
    }
})

const isChecked = computed(() => {
    return props.item.REVERSAL?.text != ''
})

const convertDate = (dateStr: string) => {
    const dateData = dateStr.split('-')
    if(dateData && dateData.length) {
        let [ _, month, day ] = dateData

        if(day.split(' ').length > 1) {
            const [dayDate, time] = day.split(' ')
            let [hour, minutes] = time.split(':')
            let code = 'AM'

            if(Number(hour) > 12) {
                hour = String(Number(hour) - 12)
                code = 'PM'
            }
            const newTime = `${[String(Number(hour)), minutes].join(':')}${code}`
            day = [dayDate, newTime].join(' ')
        }
        return [month, day].join('/')
    }
}

function handleUpdatePrio(e: HTMLSelectElement) {
    //TODO: Create end point on backend to update Monday Board when selection is changed
    console.log(e.value)
}
</script>