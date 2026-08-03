// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import InventoryHome from '../views/Inventory/Home.vue'
import AddVehicle from '../views/Inventory/AddVehicle.vue'
import EditVehicle from '../views/Inventory/EditVehicle.vue'
import StoreView from '../views/Inventory/StoreView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/inventory/', component: InventoryHome },
  { path: '/inventory/add-vehicle', component: AddVehicle },
  { path: '/inventory/edit/:itemId', component: EditVehicle },
  { path: '/inventory/:storeAbbr', component: StoreView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
