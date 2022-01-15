<template>
  <div :class="$style['wrapper']" @keyup.enter.stop="addUser">
    <CvForm :class="$style['register-box']">
      <h2>Register</h2>
      <CvTextInput type="email" v-model="userEmail" placeholder="Email"></CvTextInput>
      <CvTextInput v-model="username" placeholder="User Name"></CvTextInput>
      <CvTextInput v-model="name" placeholder="Name"></CvTextInput>
      <CvTextInput v-model="surname" placeholder="Surname"></CvTextInput>
      <CvTextInput v-model="password" placeholder="Password"></CvTextInput>
      <CvButton @click="addUser">Create Account</CvButton>
    </CvForm>
  </div>
</template>

<script>
import { CvButton, CvTextInput, CvForm } from '@carbon/vue'
import axios from 'axios';

export default {
  name: 'RegisterPage',
  components: {
    CvButton,
    CvTextInput,
    CvForm
  },
  data() {
    return {
      userEmail: '',
      username: '',
      password: '',
      name: '',
      surname: ''
    }
  },
  methods: {
    async addUser() {
      await axios.post('users/register', {username: this.username, password: this.password});
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" module>
@import '@/assets/_variables';

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: $primary;
  background-color: $background;
}

.register-box {
  width: 50%;
  height: 50%;
  background-color: $secondary;
}
</style>