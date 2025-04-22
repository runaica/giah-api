import { createRouter, createWebHistory } from 'vue-router'
import ConsultationHome from '../components/ConsultationHome.vue'
import ConsultationDetail from '../components/ConsultationDetail.vue'

const routes = [
  { path: '/', component: ConsultationHome },
  { path: '/consultations/:id', component: ConsultationDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
