import { createRouter, createWebHistory } from 'vue-router'

import IncomesPage from '../pages/IncomesPage.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import SalesPage from '../pages/SalesPage.vue'
import StocksPage from '../pages/StocksPage.vue'


const routes = [
  {
    path: '/',
    redirect: '/incomes'
  },
  {
    path: '/incomes',
    name: 'Incomes', 
    component: IncomesPage
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage
  },
  {
    path: '/sales',
    name: 'Sales',
    component: SalesPage
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: StocksPage
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router