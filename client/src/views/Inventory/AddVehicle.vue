<template>
  <Navigation />

  <FormLayout :showPayoff="hasPayoff">
    <template #personal-info>
      <FormInput
        name="yourName"
        input-type="text"
        v-model="submitBy"
      />
      <FormInput
        name="yourEmail"
        input-type="email"
        v-model="email"
        />
      <StoreSelect @select-store="(store) => (storeName = store.name)" />
    </template>
    <template #vehicle-info>
      <Dropdown
        name="carType"
        :options="carTypeOptions"
        v-model="carType"
      />
      <Dropdown
        v-if="carType"
        :name="`${carType}CarOrigin`"
        :options="carType?.includes('New') ? newOriginOptions : usedOriginOptions"
        v-model="origin"
      />
      <Dropdown
        v-if="origin?.includes('Wholesale')"
        :name="origin.includes('Sale') ? 'specifyTransactionMethod' : 'specifyTypeOfAuction'"
        :options="origin.includes('Sale') ? SaleOptions : PurchaseOptions"
        v-model="transactionMethod"
      />
      <Dropdown
        v-if="origin?.includes('Street')"
        name="titleOrPayoff"
        :options="titleOrPayoffOptions"
        v-model="titleOrPayoff"
      />
      <Dropdown
        v-if="titleOrPayoff?.includes('Title')"
        name="whatKindOfTitle?"
        :options="TitleOptions"
        v-model="titleType"
      />
    </template>
    <template #payoff-info>
      <FormInput
        name="lienHolder"
        input-type="text"
        v-model="lienHolder"
      />
      <FormInput
        name="payoffAmount"
        input-type="number"
        v-model="payoffAmount"
      />
      <FormInput
        name="perDiem"
        input-type="number"
        v-model="perDiem"
      />
      <FormInput 
        name="goodTill" 
        input-type="date" 
        v-model="goodTill"
      />
    </template>
    <template #stock-numbers>
      <StockNumberInput @add-stock-number="addStockNumber" />
      <div>
        <Badge v-for="(stockNumber, index) in stockNumbers" :key="`stock-number-badge-${index}`"  @remove-stock="() => removeStockNumber(index)" class="success">{{ stockNumber }}</Badge>
      </div>
    </template>
    <template #additional-info>
      <FileUploader @update:files="handleFilesUpdate" />
      <div class="flex justify-evenly">
        <div class="text-center">
          <div>
            <label for="reversal-checkbox">Reversal</label>
            <input type="checkbox" id="reversal-checkbox" v-model="isReversal" />
          </div>
          <small>Check if this should be considered a Reversal</small>
        </div>
        <textarea
          v-model="formNotes"
          cols="70"
          rows="5"
          placeholder="Additional Notes..."
        />
      </div>
      <button
        class="btn"
        @click="handleSubmit"
      >
        Submit
      </button>
    </template>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import Dropdown from '../../components/Dropdown.vue'
import StoreSelect from '../../components/inventory/store-select.vue'
import FormInput from '../../components/FormInput.vue'
import StockNumberInput from '../../components/inventory/stock-number-input.vue'
import {
  carTypeOptions,
  newOriginOptions,
  usedOriginOptions,
  TitleOptions,
  SaleOptions,
  PurchaseOptions,
  titleOrPayoffOptions
} from '../../utilities/constants/inventory.ts'
import Navigation from '../../components/global/Navigation.vue'
import Badge from '../../components/global/Badge.vue'
import FormLayout from '../../components/inventory/FormLayout.vue'
import FileUploader from '../../components/FileUploader.vue'

import mondaySdk from 'monday-sdk-js'
const monday = mondaySdk()
const contextRes = await monday.get("context");
const context = contextRes.data as any
const BASE_URL = `${context.appVersion.mondayCodeHostingUrl}/api/`;

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
const attachments: Ref<File[]> = ref([])
const stockNumbers: Ref<Array<String>> = ref([])


const hasPayoff = computed(() => {
  return titleOrPayoff.value === 'Payoff'
})

function handleFilesUpdate(filesPayload: File[]) {
  attachments.value = filesPayload
}


function addStockNumber(value: string) {
  if (value) {
    stockNumbers.value.push(value)
  }
}

function removeStockNumber(idx: number) {
  stockNumbers.value.splice(idx, 1)
}

async function handleSubmit() {
  const formData = new FormData()

  formData.append('submitBy', submitBy.value || '')
  formData.append('email', email.value || '')
  formData.append('storeName', storeName.value || '')
  formData.append('carType', carType.value || '')
  formData.append('origin', origin.value || '')
  formData.append('transactionMethod', transactionMethod.value || '')
  formData.append('titleOrPayoff', titleOrPayoff.value || '')
  formData.append('titleType', titleType.value || '')
  formData.append('lienHolder', lienHolder.value || '')
  formData.append('payoffAmount', payoffAmount.value?.toString() || '')
  formData.append('perDiem', perDiem.value?.toString() || '')
  formData.append('goodTill', goodTill.value || '')
  formData.append('formNotes', formNotes.value || '')
  formData.append('isReversal', isReversal.value.toString())
  formData.append('stockNumbers', JSON.stringify(stockNumbers.value))

  if (attachments.value) {
    for (let i = 0; i < attachments.value.length; i++) {
      formData.append('attachments', attachments.value[i])
    }
  }

  try {
    const response = await fetch(`${BASE_URL}inventory/add-vehicle`, {
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
  } finally {
    submitBy.value = null
    email.value = null
    storeName.value = null
    carType.value = null
    origin.value = null
    transactionMethod.value = null
    titleOrPayoff.value = null
    titleType.value = null
    lienHolder.value = null
    payoffAmount.value = null
    perDiem.value = null
    goodTill.value = null
    formNotes.value = null
    isReversal.value = false
    attachments.value = []
    stockNumbers.value = []
  }

}
</script>
