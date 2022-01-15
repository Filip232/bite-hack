<template>
  <div :class="$style['wrapper']">
    <div :class="$style['register-box']">
      <h2>Register</h2>
      <CvTextInput v-model="name" placeholder="Name"></CvTextInput>
      <CvTextInput v-model="passwor" placeholder="Password"></CvTextInput>
      <CvButton @click="addUser">Twe</CvButton>
    </div>
  </div>
</template>

<script>
import { CvButton, CvTextInput } from '@carbon/vue'
import axios from 'axios';

export default {
  name: 'RegisterPage',
  components: {
    CvButton,
    CvTextInput
  },
  async mounted() {
      const { data } = await axios.get('users');
      console.log(data);
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
}

.register-box {
  width: 50%;
  height: 50%;
  background-color: $secondary;
}
</style>