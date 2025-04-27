<template>
  <div>
    <h2>예약 등록</h2>
    <form @submit.prevent="submitReservation">
      <div>
        <label>보호자 이름:</label>
        <input v-model="form.ownerName" required />
      </div>
      <div>
        <label>반려동물 이름:</label>
        <input v-model="form.petName" required />
      </div>
      <div>
        <label>예약 날짜:</label>
        <input type="date" v-model="form.reservationDate" required />
      </div>
      <div>
        <label>예약 시간:</label>
        <input type="time" v-model="form.reservationTime" required />
      </div>
      <div>
        <label>전화번호:</label>
        <input v-model="form.phoneNumber" />
      </div>
      <div>
        <label>담당 수의사:</label>
        <input v-model="form.attendingVet" />
      </div>
      <div>
        <label>방문 목적:</label>
        <input v-model="form.visitPurpose" />
      </div>
      <button type="submit">예약하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationForm',
  data() {
    return {
      form: {
        ownerName: '',
        petName: '',
        reservationDate: '',
        reservationTime: '',
        phoneNumber: '',
        attendingVet: '',
        visitPurpose: ''
      }
    };
  },
  methods: {
    async submitReservation() {
      try {
        const response = await axios.post('http://localhost:3000/reservations', this.form);
        alert('예약이 완료되었습니다! ID: ' + response.data.id);
        this.$router.push('/'); // 필요에 따라 다른 페이지로 이동 가능
      } catch (error) {
        console.error(error);
        alert('예약 등록에 실패했습니다.');
      }
    }
  }
};
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
}
</style>
