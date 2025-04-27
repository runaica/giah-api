import { createRouter, createWebHistory } from 'vue-router'
import ConsultationHome from '../components/ConsultationHome.vue'
import ConsultationDetail from '../components/ConsultationDetail.vue'
import ReservationForm from '../components/ReservationForm.vue' // 추가
import ReservationList from '../components/ReservationList.vue'; // 추가
import ReservationDetail from '../components/ReservationDetail.vue'; 
const routes = [
  { path: '/', component: ConsultationHome },
  { path: '/consultations/:id', component: ConsultationDetail },
  { path: '/reservations/new', component: ReservationForm }, // 추가
  { path: '/reservations', component: ReservationList }, // ✨ 추가
  { path: '/reservations/:id', component: ReservationDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
