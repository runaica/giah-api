<template>
  <div>
    <h2>상담 목록</h2>
    <ul>
      <li v-for="c in consultations" :key="c.id">
        <router-link :to="`/consultations/${c.id}`">
          {{ c.subject }}
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'ConsultationList',
  props: {
    consultations: Array
  }
}
</script>
