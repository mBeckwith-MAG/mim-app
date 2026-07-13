<template>
  <!-- <PageTitle>Add Vehicle</PageTitle> -->
  <div class="grid gap-5 p-4">
    <Card>
      <template #title>Personal Info</template>
      <template #body>
        <Row>
          <Column>
            <FormInput
              name="yourName"
              input-type="text"
              v-model="submitBy"
            />
          </Column>

          <Column>
            <FormInput
              name="yourEmail"
              input-type="email"
              v-model="email"
            />
          </Column>

          <Column>
            <StoreSelect @select-store="(store) => (storeName = store.name)" />
          </Column>
        </Row>
      </template>
    </Card>

    <Card>
      <template #title>Vehicle Information</template>
      <template #body>
        <Row>
          <Dropdown
            name="carType"
            :options="carTypeOptions"
            v-model="carType"
          />
        </Row>
        <Row>
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
        </Row>
        <Row>
          <StockNumberInput @add-stock-number="addStockNumber" />
          <Column>
            <StockNumberDisplay :items="stockNumbers" @remove-stock="removeStockNumber" />
          </Column>
        </Row>
      </template>
    </Card>

    <Card v-if="titleOrPayoff === 'Payoff'">
      <template #title>Payoff Information</template>
      <template #body>
        <Row>
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
        </Row>
      </template>
    </Card>

    <Card>
      <template #title>Additional Information</template>
      <template #body>
        <Row>
          <Column>
            <div class="grid gap-4 text-center md:text-start">
              <div class="flex justify-evenly md:justify-start gap-4 items-center">
                <label for="reversal-checkbox">Reversal</label>
                <input type="checkbox" id="reversal-checkbox" v-model="isReversal" />
              </div>
              <small>Check if this should be considered a Reversal</small>
            </div>
          </Column>
          <Column>
            <label for="form-attachments">Attachments</label>
            <input type="file" multiple @change="handleAttachment" />
          </Column>
          <Column class="items-start">
            <label for="additional-notes-input">Additional Notes</label>
            <textarea
              id="additional-notes-input"
              v-model="formNotes"
              cols="70"
              rows="5"
              class="ps-2 border border-slate-300 rounded focus:border-2 focus:border-slate-400 focus:outline-none"
            />
          </Column>
        </Row>
      </template>
      <template #footer>
        <Row class="justify-center">
          <button
            class="btn"
            @click="handleSubmit"
          >
            Submit
          </button>
        </Row>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Dropdown from '../components/Dropdown.vue'
import StoreSelect from '../components/inventory/store-select.vue'
import Card from '../components/Card.vue'
import FormInput from '../components/FormInput.vue'
import Row from '../components/row.vue'
import Column from '../components/column.vue'
import StockNumberInput from '../components/inventory/stock-number-input.vue'
import StockNumberDisplay from '../components/stock-number-display.vue'
import {
  carTypeOptions,
  newOriginOptions,
  usedOriginOptions,
  TitleOptions,
  SaleOptions,
  PurchaseOptions,
  titleOrPayoffOptions,
} from '../constants/inventory.ts'

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
const attachments: Ref<FileList | null> = ref(null)
const stockNumbers: Ref<Array<String>> = ref([])

// function handleGoodTill(input: string) {
//   const date = new Date(input).toISOString().split('T')[0]
//   if (date != undefined) {
//     goodTill.value = date
//   }
// }

function handleAttachment(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files && files.length) {
    attachments.value = files
  }
}

function addStockNumber(value: string) {
  if (value) {
    stockNumbers.value.push(value)
  }
}

function removeStockNumber(idx: number) {
  stockNumbers.value.splice(idx, 1)
}

function handleSubmit() {
  console.log('Form Data:', {
    name: submitBy.value,
    email: email.value,
    store: storeName.value,
    carType: carType.value,
    origin: origin.value,
    transactionMethod: transactionMethod.value,
    titleOrPayoff: titleOrPayoff.value,
    titleType: titleType.value,
    stockNumbers: [...stockNumbers.value],
    lienHolder: lienHolder.value,
    payoffAmount: payoffAmount.value,
    perDiem: perDiem.value,
    goodTill: goodTill.value,
    formNotes: formNotes.value,
    isReversal: isReversal.value,
    attachments: { ...attachments.value },
  })
}
</script>
