<template>
    <Navigation v-if="stockNumber" :stockNumber />
    <Navigation v-else />

    <div v-if="status === 'Reject'" class="absolute top-0 right-0 pt-md pe-md">
      <div class="btn text-center text-xl font-thin" @click="handleUpdate">UPDATE</div>
    </div>

    <div class="grid p-4">
        <div class="grid gap-md">
            <div class="grid lg:grid-cols-3 gap-md">
                <Card>
                    <template #title>Basic Information</template>
                    <template #body>
                        <DisplayData v-model="storeName">Store</DisplayData>
                        <DisplayData v-model="carType">Car Type</DisplayData>
                        <DisplayData v-model="status" altText="Incomming">Status</DisplayData>
                        <DisplayData v-model="submitBy">Submit By</DisplayData>
                        <DisplayData v-model="email">Email</DisplayData>
                        <div class="text-center mt-xl">
                          <div>
                            <label for="reversal-checkbox">Reversal</label>
                            <input type="checkbox" id="reversal-checkbox" v-model="isReversal" />
                          </div>
                          <small>Check if this should be considered a Reversal</small>
                        </div>
                      </template>
                </Card>

                <Card>
                    <template #title>Item Dates</template>
                    <template #body>
                        <DateDisplay v-if="createdDate" :date="createdDate">Created Date</DateDisplay>
                        <DisplayData v-else v-model="createdDate" altText="Doesn't Exist">Created Date</DisplayData>
                        <DateDisplay v-if="startDate" :date="startDate">Start Date</DateDisplay>
                        <DisplayData v-else v-model="startDate" altText="Incomming">Start Date</DisplayData>
                        <DateDisplay v-if="endDate" :date="endDate">End Date</DateDisplay>
                        <DisplayData v-else v-model="endDate" altText="Not Complete">End Date</DisplayData>
                    </template>
                </Card>

                <Card v-if="hasPayoff">
                    <template #title>Payoff Information</template>
                    <template #body>
                        <DisplayData v-model="newLienHolder" :altText="lienHolder || ''" :canEdit>Lien Holder</DisplayData>
                        <DisplayData v-model="newPayoffAmount" :altText="String(payoffAmount) || ''" :canEdit>Payoff Amount</DisplayData>
                        <DisplayData v-model="newPerDiem" :altText="String(perDiem) || ''" :canEdit>Per Diem</DisplayData>
                        <div v-if="goodTill">
                          <DateInput v-if="canEdit" v-model="newGoodTill" :currentDate="goodTill">Good Till</DateInput>
                          <DisplayData v-else v-model="goodTill">Good Till</DisplayData>
                        </div>
                        <DisplayData v-model="checkStatus">Check Status</DisplayData>
                        <DisplayData v-model="paymentTracking">Payment Tracking</DisplayData>
                    </template>
                </Card>

                <NotesDisplay v-else :notes="inventoryNotes || ''">
                    <template #title>Inventory Notes</template>
                </NotesDisplay>
            </div>
            <div :class="['grid gap-md', hasPayoff ? 'lg:grid-cols-3' : 'lg:grid-cols-2']">
                <NotesDisplay v-if="hasPayoff" :notes="inventoryNotes || ''">
                    <template #title>Inventory Notes</template>
                </NotesDisplay>

                <NotesDisplay @update-value="handleNotes" :notes="formNotes || ''" :canEdit>
                    <template #title>Form Notes</template>
                </NotesDisplay>

                <AttachmentDisplay :attachments="attachmentList || []" :hasPayoff @addFile="handleAddFile" :canEdit />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import { InventoryItem } from '../../utilities/models/inventory.ts'
import { BASE_URL } from '../../utilities/constants/inventory.ts'
import type { Item } from '../../utilities/types/inventory.ts'

import Navigation from '../../components/global/Navigation.vue'
import NotesDisplay from '../../components/inventory/NotesDisplay.vue'
import AttachmentDisplay from '../../components/inventory/AttachmentDisplay.vue'
import DisplayData from '../../layouts/DisplayData.vue'
import Card from '../../layouts/card/Card.vue'
import DateDisplay from '../../components/global/DateDisplay.vue'
import DateInput from '../../components/global/DateInput.vue'


const route = useRoute()
const hasVehicle = ref(false)
const UID: Ref<string | null> = ref(null)
const submitBy: Ref<string | null> = ref(null)
const email: Ref<string | null> = ref(null)
const storeName: Ref<string | null> = ref(null)
const carType: Ref<string | null> = ref(null)
const origin: Ref<string | null> = ref(null)
const transactionMethod: Ref<string | null> = ref(null)
const titleOrPayoff: Ref<string | null> = ref(null)
const titleType: Ref<string | null> = ref(null)
const lienHolder: Ref<string | null> = ref(null)
const payoffAmount: Ref<number | null> = ref(null)
const perDiem: Ref<number | null> = ref(null)
const goodTill: Ref<string | null> = ref(null)
const formNotes: Ref<string | null> = ref(null)
const isReversal: Ref<boolean> = ref(false)
const existing_attachments: Ref<String | null> = ref(null)
const stockNumber: Ref<string | null> = ref(null)
const status: Ref<string | null> = ref(null)
const checkStatus: Ref<string | null> = ref(null)
const createdDate: Ref<string | null> = ref(null)
const startDate: Ref<string | null> = ref(null)
const endDate: Ref<string | null> = ref(null)
const paymentTracking: Ref<string | null> = ref(null)
const inventoryNotes: Ref<string | null> = ref(null)

const attachments: Ref<File[] | null> = ref(null)
const newTitleOrPayoff: Ref<string | null> = ref(null)
const newTitleType: Ref<string | null> = ref(null)
const newLienHolder: Ref<string | null> = ref(null)
const newPayoffAmount: Ref<number | null> = ref(null)
const newPerDiem: Ref<number | null> = ref(null)
const newGoodTill: Ref<string | null> = ref(null)

const refMapping: Record<string, Ref<any>> = {
  SUBMIT_BY: submitBy,
  RETURN_EMAIL: email, 
  STORE: storeName,
  CAR_TYPE: carType,
  NEW_ORIGIN: origin,
  USED_ORIGIN: origin,
  TRANSACTION_METHOD: transactionMethod,
  TITLE_OR_PAYOFF: titleOrPayoff,
  TITLE_TYPE: titleType,
  LIEN_HOLDER: lienHolder,
  PAYOFF_AMOUNT: payoffAmount,
  PER_DIAM: perDiem,
  GOOD_TILL_DATE: goodTill,
  FORM_NOTES: formNotes,
  IS_REVERSAL: isReversal,
  ATTACHMENTS: existing_attachments,
  STOCK_NUMBER: stockNumber,
  STATUS: status,
  CHECK_STATUS: checkStatus,
  CREATED_DATE: createdDate,
  START_DATE: startDate,
  END_DATE: endDate,
  PAYMENT_TRACKING: paymentTracking,
  INVENTORY_NOTES: inventoryNotes
}

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}inventory/edit-vehicle/${route.params.itemId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json();
    const { id, name, column_values } = data.item.items[0]

    UID.value = id

    const item: Item = { id, name, column_values }
    const vehicle = new InventoryItem(item)

    for (const key in refMapping) {
  if (key in vehicle) {
    const vehicleValue = vehicle[key as keyof typeof vehicle];

    if (vehicleValue && typeof vehicleValue === 'object' && 'text' in vehicleValue) {
      if (vehicleValue.text !== null && vehicleValue.text !== '') {
        
        if (typeof refMapping[key].value === 'number') {
          refMapping[key].value = Number(vehicleValue.text)
        } else {
          refMapping[key].value = vehicleValue.text
        }
      }
    } else if (vehicleValue !== undefined && vehicleValue !== null) {
      refMapping[key].value = vehicleValue
    }
  }
}
    hasVehicle.value = true

  } catch (error) {
    console.error("Failed to load vehicle data:", error)
  }
});

const attachmentList = computed(() => {
    return existing_attachments.value?.split(',')
})

const hasPayoff = computed(() => {
  return titleOrPayoff.value === 'Payoff'
})

const canEdit = computed(() => {
    return status.value === 'Reject'
})

const handleAddFile = (files: File[]) => {
    attachments.value = files
}

async function handleUpdate() {
  const formData = new FormData()

  if(newTitleOrPayoff.value) formData.append('titleOrPayoff', newTitleOrPayoff.value)
  if(newTitleType.value) formData.append('titleType', newTitleType.value)
  if(newLienHolder.value) formData.append('lienHolder', newLienHolder.value)
  if(newPayoffAmount.value) formData.append('payoffAmount', newPayoffAmount.value?.toString())
  if(newPerDiem.value) formData.append('perDiem', newPerDiem.value?.toString())
  if(newGoodTill.value) formData.append('goodTill', newGoodTill.value)
  if(formNotes.value) formData.append('formNotes', formNotes.value)
  formData.append('isReversal', isReversal.value.toString())

  if(attachments.value && attachments.value.length > 0) {
    for (let i = 0; i < attachments.value.length; i++) {
      formData.append('attachments', attachments.value[i])
    }
  }

  try {
    const response = await fetch(`${BASE_URL}inventory/update/${UID.value}`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      console.log("Form Data", data)
    } else {
      console.error('Submission failed:', response.statusText)
    }
  } catch (error) {
    console.error('Network error occurred:', error)
  }
}

function handleNotes(e: HTMLTextAreaElement) {
  formNotes.value = e.value
}
</script>
