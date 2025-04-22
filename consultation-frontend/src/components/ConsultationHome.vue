<!-- src/views/ConsultationHome.vue -->

<template>
  <div>
    <ConsultationForm @submitted="loadList" />
    <ConsultationList :consultations="consultations" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ConsultationForm from './ConsultationForm.vue'
import ConsultationList from './ConsultationList.vue'
import api from '../api/axios'

const consultations = ref([])

async function loadList() {
  const res = await api.get('/consultations')
  consultations.value = res.data
}

onMounted(loadList)
</script>
