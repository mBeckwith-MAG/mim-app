<template>
    <nav class="flex justify-between items-center p-md">
        <div class="flex justify-start gap-lg">
            <div class="text-5xl font-thin">
                <div v-if="stockNumber">{{ stockNumber }}</div>
                <div v-else>{{ storeName ? storeName : 'All' }} Inventory</div>
            </div>

            <div v-if="showInventoryKey" class="flex justify-evenly gap-md border border-border rounded-2xl p-lg">
                <div class="flex gap-sm">
                    <span class="rounded-full h-sm w-sm self-center bg-gray-400" />
                    <span>Incomming</span>
                </div>
                <div class="flex gap-sm">
                    <span class="rounded-full h-sm w-sm self-center bg-amber-400" />
                    <span>Working</span>
                </div>
                <div class="flex gap-sm">
                    <span class="rounded-full h-sm w-sm self-center bg-red-400" />
                    <span>Reject</span>
                </div>
                <div class="flex gap-sm">
                    <span class="rounded-full h-sm w-sm self-center bg-emerald-400" />
                    <span>Done</span>
                </div>
            </div>
        </div>

        <div v-if="showAddVehicle">
            <RouterLink to="/inventory/add-vehicle">
              <div class="btn mb-12">
                <ButtonAddIcon width="2em" />
              </div>
            </RouterLink>
        </div>
    </nav>
</template>
<script setup lang="ts">
defineProps({
    storeName: {
        type: String,
        default: null
    },
    stockNumber: {
        type: String,
        default: null
    },
    showAddVehicle: {
        type: Boolean,
        default: false
    },
    showInventoryKey: {
        type: Boolean,
        default: false
    },
})
</script>