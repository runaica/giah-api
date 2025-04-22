<template>
  <div>
    <h2>상담 등록</h2>
    <form @submit.prevent="submitForm">

      <!-- 이름 입력 -->
      <input v-model="ownerName" type="text" placeholder="이름 (필수)" required />

      <!-- 비밀번호 입력 -->
      <input v-model="password" type="password" placeholder="비밀번호 (필수)" required />

      <!-- 이메일 입력 -->
      <input v-model="email" type="email" placeholder="이메일 (선택)" />

      <!-- 이메일 수신 동의 체크박스 -->
      <label>
        <input v-model="agreeEmail" type="checkbox" /> 이메일 수신 동의
      </label>

      <!-- 연락처 입력 -->
      <input v-model="phoneNumber" type="text" placeholder="연락처 (선택)" />

      <!-- 문자 수신 동의 체크박스 -->
      <label>
        <input v-model="agreeSms" type="checkbox" /> 문자 수신 동의
      </label>

      <!-- 상담 제목 입력 -->
      <input v-model="title" type="text" placeholder="상담 제목 (필수)" required />

      <!-- 상담 내용 입력 -->
      <textarea v-model="content" placeholder="상담 내용 (필수)" required></textarea>

      <!-- 개인정보 수집 동의 체크박스 (필수) -->
      <label>
        <input v-model="agreePrivacy" type="checkbox" required /> 개인정보 수집 및 이용 동의
      </label>

      <!-- 제출 버튼 -->
      <button type="submit">등록</button>

    </form>
  </div>
</template>

<script>
// API 요청을 위한 axios 인스턴스 임포트
import api from '../api/axios'

export default {
  name: 'ConsultationForm',
  data() {
    return {
      // 폼 입력값 상태
      ownerName: '',
      password: '',
      email: '',
      agreeEmail: false,
      phoneNumber: '',
      agreeSms: false,
      title: '',
      content: '',
      agreePrivacy: false
    }
  },
  methods: {
    // 상담 등록 API 호출
    async submitForm() {
      try {
        const res = await api.post('/consultations', {
          status: '대기중',
          ownerName: this.ownerName,
          password: this.password,
          email: this.email || '',
          agreeEmail: this.agreeEmail ? 'Y' : 'N',
          phoneNumber: this.phoneNumber || '',
          agreeSms: this.agreeSms ? 'Y' : 'N',
          subject: this.title,
          content: this.content,
          agreePrivacy: this.agreePrivacy ? 'Y' : 'N'
        });

        alert('상담 등록 완료');

        // 폼 초기화
        this.ownerName = '';
        this.password = '';
        this.email = '';
        this.agreeEmail = false;
        this.phoneNumber = '';
        this.agreeSms = false;
        this.title = '';
        this.content = '';
        this.agreePrivacy = false;

        this.$emit('submitted'); // 등록 완료 후 목록 새로고침
      } catch (err) {
        console.error('등록 실패', err);
        alert('등록 실패');
      }
    }
  }
}
</script>
