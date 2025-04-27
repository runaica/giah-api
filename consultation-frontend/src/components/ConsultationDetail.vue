<template>
  <div v-if="consultation">
    <h2>동물병원 상담 시스템</h2>

    <div v-if="!isEditing">
      <h3>{{ consultation.subject }}</h3>
      <p>{{ consultation.content }}</p>
      <p>작성자: {{ consultation.ownerName }}</p>
    </div>

    <div v-else>
      <input v-model="editSubject" placeholder="제목" />
      <textarea v-model="editContent" placeholder="내용"></textarea>
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button @click="submitUpdate">수정 확인</button>
      <button @click="isEditing = false">취소</button>
    </div>

    <!-- 수정 & 삭제 버튼은 항상 보이게 -->
    <div style="margin-top: 10px">
      <button v-if="!isEditing" @click="isEditing = true">수정하기</button>
      <button @click="showConfirm = true">삭제하기</button>
    </div>

    <!-- 삭제 확인 입력창 -->
    <div v-if="showConfirm">
      <input v-model="password" type="password" placeholder="삭제 비밀번호" />
      <button @click="submitDelete">삭제 확인</button>
      <button @click="showConfirm = false">취소</button>
    </div>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const consultation = ref(null)
const isEditing = ref(false)
const showConfirm = ref(false)

const editSubject = ref('')
const editContent = ref('')
const password = ref('')
const error = ref('')

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/consultations/${route.params.id}`)
  consultation.value = res.data
  editSubject.value = res.data.subject
  editContent.value = res.data.content
})

async function submitUpdate() {
  try {
    await axios.put(`http://localhost:3000/consultations/${route.params.id}`, {
      subject: editSubject.value,
      content: editContent.value,
      password: password.value,
      status: consultation.value.status,
      ownerName: consultation.value.ownerName,
      email: consultation.value.email,
      agreeEmail: consultation.value.agreeEmail,
      phoneNumber: consultation.value.phoneNumber,
      agreeSms: consultation.value.agreeSms,
      agreePrivacy: consultation.value.agreePrivacy
    })
    consultation.value.subject = editSubject.value
    consultation.value.content = editContent.value
    isEditing.value = false
    error.value = ''
  } catch (err) {
    error.value = err.response?.data || '수정 실패';
  }
}

async function submitDelete() {
  try {
    await axios.delete(`http://localhost:3000/consultations/${route.params.id}`, {
      data: { password: password.value }
    })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data || '삭제 실패';
  }
}
</script>
