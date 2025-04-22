<template>
  <div v-if="consultation">
    <h2>{{ consultation.subject }}</h2>
    <p>{{ consultation.content }}</p>
    <p>작성자: {{ consultation.ownerName }}</p>
  </div>
</template>

<script>
import api from '../api/axios'

export default {
  name: 'ConsultationDetail',
  data() {
    return {
      consultation: null
    }
  },
  async created() {
  const id = this.$route.params.id;
  const res = await api.get(`/consultations/${id}`);
  this.consultation = res.data;
}

}
</script>
