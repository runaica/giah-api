<template>
  <div>
    <h2>예약 목록</h2>
    <table>
      <thead>
        <tr>
          <th>보호자 이름</th>
          <th>반려동물 이름</th>
          <th>예약 날짜</th>
          <th>예약 시간</th>
          <th>전화번호</th>
          <th>담당 수의사</th>
          <th>방문 목적</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id" @click="goToDetail(reservation.id)" style="cursor: pointer;">
            <td>{{ reservation.ownerName }}</td>
            <td>{{ reservation.petName }}</td>
            <td>{{ reservation.reservationDate }}</td>
            <td>{{ reservation.reservationTime }}</td>
            <td>{{ reservation.phoneNumber }}</td>
            <td>{{ reservation.attendingVet }}</td>
            <td>{{ reservation.visitPurpose }}</td>
        </tr>
        </tbody>

    </table>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ReservationList',
  methods: {
  goToDetail(id) {
        this.$router.push(`/reservations/${id}`);
    }
    },
  data() {
    return {
      reservations: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/reservations');
      this.reservations = response.data;
    } catch (error) {
      console.error('예약 목록 조회 실패', error);
      alert('예약 목록을 불러오는 데 실패했습니다.');
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}
</style>
