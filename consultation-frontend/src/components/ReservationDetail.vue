<template>
  <div v-if="reservation">
    <h2>예약 상세</h2>
    <p><strong>보호자 이름:</strong> {{ reservation.ownerName }}</p>
    <p><strong>반려동물 이름:</strong> {{ reservation.petName }}</p>
    <p><strong>예약 날짜:</strong> {{ reservation.reservationDate }}</p>
    <p><strong>예약 시간:</strong> {{ reservation.reservationTime }}</p>
    <p><strong>전화번호:</strong> {{ reservation.phoneNumber }}</p>
    <p><strong>담당 수의사:</strong> {{ reservation.attendingVet }}</p>
    <p><strong>방문 목적:</strong> {{ reservation.visitPurpose }}</p>
  </div>
  <div v-else>
    <p>예약 정보를 불러오는 중입니다...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationDetail',
  data() {
    return {
      reservation: null
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/reservations/${id}`);
      this.reservation = response.data;
    } catch (error) {
      console.error('예약 상세 조회 실패', error);
      alert('예약 정보를 불러오는 데 실패했습니다.');
    }
  }
};
</script>
