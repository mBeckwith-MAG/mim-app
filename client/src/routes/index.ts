// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import AddVehicle from '../views/AddVehicle.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/add-vehicle', component: AddVehicle }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
