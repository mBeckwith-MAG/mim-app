<template>
    <div :class="['filter-bar', { 'horizontal': horizontal, 'show': show }]">
        <ItemSearch v-model="model" />
        <Dropdown name="carType" :options="carTypeOptions" v-model="model" />
        <Dropdown name="status" :options="statusOptions" v-model="model" />
        <Dropdown name="submitBy" :options="submitters" v-model="model" />
        <Dropdown name="carOrigin" :options="[ ...newOriginOptions, ...usedOriginOptions ]" v-model="model" />
        <Dropdown name="titleOrPayoff" :options="titleOrPayoffOptions" v-model="model" />
        <div class="toggle" @click="toggleShow" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ItemSearch from './ItemSearch.vue';
import Dropdown from '../Dropdown.vue';
import { carTypeOptions, statusOptions, newOriginOptions, usedOriginOptions, titleOrPayoffOptions } from '../../utilities/constants/inventory.ts';

const show = ref(false)
const model = defineModel()

defineProps({
    submitters: {
        type: Array<String>,
        required: true
    },
    horizontal: {
        type: Boolean,
        default: false
    }
})

const toggleShow = () => {
    show.value = !show.value
}
</script>