<template>
  <div :class="$style['wrapper']" @keyup.enter.stop="register">
    <CvForm :class="$style['register-box']" @submit="checkForm">
      <h2>Register</h2>
      <p>Email</p>
      <CvTextInput type="email" v-model="userEmail" placeholder="Email" min-length="3" required invalid-message="true"></CvTextInput>
      <p>Username</p>
      <CvTextInput v-model="username" placeholder="User Name" min-length="3" required></CvTextInput>
      <p>First Name</p>
      <CvTextInput v-model="name" placeholder="Name" min-length="3" required></CvTextInput>
      <p>Surname</p>
      <CvTextInput v-model="surname" placeholder="Surname" min-length="3" required></CvTextInput>
      <p>Password</p>
      <CvTextInput v-model="password" placeholder="Password" min-length="3" required></CvTextInput>
      <CvButton @click="register">Create Account</CvButton>
    </CvForm>
    <CvToastNotification
      :class="[
        $style['notification'],
        {
          [$style['notification--opened']]: errorVisible,
          [$style['notification--closed']]: !errorVisible
        },
      ]"
      kind="error"
      title="Error"
      :caption="errorMessage"
      @close="errorVisible = false"
    />
  </div>
</template>

<script>
import { CvButton, CvTextInput, CvForm, CvToastNotification } from '@carbon/vue'
import axios from 'axios';

export default {
  name: 'RegisterPage',
  components: {
    CvButton,
    CvTextInput,
    CvForm,
    CvToastNotification
  },
  data() {
    return {
      userEmail: '',
      username: '',
      password: '',
      name: '',
      surname: '',
      validation_error: [],
      errorVisible: true,
      errorMessage: ''
    }
  },
  methods: {
    async register() {
      await axios.post('users/register', {username: this.username, password: this.password})
        .catch((error) => {
          this.validation_error.push(error);
          this.errorVisible = true;
        })
      if (!this.validation_error) {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // color: $primary;
  // background-color: $background;
}

.register-box {
  width: 50%;
  height: 50%;
  // background-color: $secondary;
}

.notification {
  position: absolute;
  top: 5%;
  transition: left 0.3s ease-in-out;

  &--opened {
    left: 5%;
  }

  &--closed {
    left: -35%;
  }
}
</style>