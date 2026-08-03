<template>{{ dateStr }}</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    date: {
        type: String,
        required: true
    }
})

// const dateStr: Ref<string | null> = ref(null)

const dateStr = computed(() => {
    console.log("Date:", props.date)

    const dateData = props.date.split('-')


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
})
</script>