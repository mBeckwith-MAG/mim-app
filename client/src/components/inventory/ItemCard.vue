<template>
    <Card :class="statusColor">
        <template #title>
            
            <CardData>
                <template #value>{{ item.name }}</template>
                <template #label>
                    <div class="relative -top-2">
                        Submit By
                    </div>
                </template>
            </CardData>
            <CardData>
                <template #value>{{ item.start_date?.text ? convertDate(item.start_date.text) : '' }}</template>
                <template #label>
                    <div class="relative -top-2">
                        Item Submit Date
                    </div>
                </template>
            </CardData>
            
        </template>
        <template #body>
            <CardSection>
                <CardData>
                    <template #value>{{ item.car_type?.text }}</template>
                    <template #label>Car Type</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.vehicle_count?.text || 1 }}</template>
                    <template #label>Vehicle Count</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.priority?.text }}</template>
                    <template #label>Priority</template>
                </CardData>
                <CardData>
                    <template #value><input type="checkbox" :checked="isChecked" class="appearance-none size-5 border border-slate-300 rounded bg-white checked:bg-red-500 relative after:content-[''] after:absolute after:hidden checked:after:block after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45" disabled /></template>
                    <template #label>Reversal?</template>
                </CardData>
            </CardSection>
            <CardSection class="justify-center gap-10">
                <CardData>
                    <template #value>{{ item.new_origin?.text === null ? item.used_origin?.text : item.new_origin?.text }}</template>
                    <template #label>Car Origin</template>
                </CardData>
                <CardData v-if="item.used_origin?.text != null && item.used_origin?.text?.includes('Wholesale')">
                    <template #value>{{ item.used_origin?.text?.includes('Sale') ? item.wholesale_transaction_method?.text : item.auction_transaction_method?.text }}</template>
                    <template #label>Transaction Method</template>
                </CardData>
                <CardData v-if="item.used_origin?.text?.includes('Street')">
                    <template #value>{{ item.title_or_payoff?.text }}</template>
                    <template #label>Title or Payoff</template>
                </CardData>
                <CardData v-if="item.title_or_payoff?.text?.includes('Title')">
                    <template #value>{{ item.title_status?.text }}</template>
                    <template #label>Title Status</template>
                </CardData>
            </CardSection>
            <CardSection v-if="item.title_or_payoff?.text === 'Payoff'">
                <CardData>
                    <template #value>{{ item.payoff_amount?.text }}</template>
                    <template #label>Payoff Amount</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.lien_holder?.text }}</template>
                    <template #label>Lien Holder</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.per_diam?.text }}</template>
                    <template #label>Per Diam</template>
                </CardData>
                <CardData>
                    <template #value>{{ item.good_till_date?.text ? convertDate(item.good_till_date.text) : '' }}</template>
                    <template #label>Good Till</template>
                </CardData>
            </CardSection>

                <Notes v-if="getStockNumbers !== ''">
                    <template #label>{{ hasMultipleStockNumbers ? 'Stock Numbers' : 'Stock Number' }}</template>
                    <template #value>{{ getStockNumbers }}</template>
                </Notes>

                <Notes v-if="item.form_notes && item.form_notes.text !== ''">
                    <template #label>Form Notes</template>
                    <template #value>{{ item.form_notes?.text }}</template>
                </Notes>

                <Notes v-if="item.inventory_notes && item.inventory_notes.text !== ''">
                    <template #label>Inventory Notes</template>
                    <template #value>{{ item.inventory_notes?.text }}</template>
                </Notes>
        </template>
        <template #footer>
                <div class="flex justify-evenly">
                    <CardData>
                        <template #value>{{ item.payment_tracking?.text }}</template>
                        <template #label>Payoff Tracking</template>
                    </CardData>
                    <CardData>
                        <template #value>{{ item.check_status?.text }}</template>
                        <template #label>Check Status</template>
                    </CardData>
    
                    <CardData>
                        <template #value>{{ item.end_date?.text ? convertDate(item.end_date.text) : '' }}</template>
                        <template #label>Completed</template>
                    </CardData>
                </div>
                <div class="flex justify-end gap-4">
                    <a :href="item.submission_link?.text || ''" alt="Form Link"><LinkIcon height="1.5em" class="cursor-pointer hover:text-slate-500 transition-all" /></a>  <!-- for the form link -->
                    <FileIcon height="1.5em" class="cursor-pointer hover:text-slate-500 transition-all" />   <!-- for the attachments -->
                </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { InventoryItem } from '../../models/inventory';
import Card from '../Card.vue';
import CardData from '../CardData.vue';
import Notes from '../Notes.vue';
import LinkIcon from '@iconify-vue/nimbus/link';
import FileIcon from '@iconify-vue/nimbus/file';
import CardSection from '../CardSection.vue';

const props = defineProps({
    item: {
        type: Object as () => InventoryItem,
        required: true
    }
})

const statusColor = computed(() => {
    switch(props.item.status?.text) {
        case 'Done': return 'border-l-20 border-l-emerald-400'
        case 'Reject': return 'border-l-20 border-l-red-400'
        default: return 'border-l-20 border-l-amber-400'
    }
})

const isChecked = computed(() => {
    return props.item.reversal?.text != ''
})

const convertDate = (dateStr: string) => {
    const dateData = dateStr.split('-')
    if(dateData && dateData.length) {
        const [ _, month, day ] = dateData

        return [month, day].join('/')
    }
}

const hasMultipleStockNumbers = computed(() => {
    if(props.item.stock_numbers?.text && props.item.stock_numbers.text?.length > 0 ||
       props.item.stock_number?.text && props.item.stock_number?.text?.length > 0 && (
        props.item.stock_number.text.includes(',') || props.item.stock_number.text.includes('/') || props.item.stock_number.text.includes(' ')
       )
    ) return true
    return false
})

const getStockNumbers = computed(() => {
    if(props.item.stock_numbers?.text && props.item.stock_numbers.text?.length > 0) return props.item.stock_numbers.text.replace(/[,/]/g, " ")
    return props.item.stock_number?.text?.replace(/[,/]/g, " ")
})
</script>