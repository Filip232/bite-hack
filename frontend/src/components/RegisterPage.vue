<template>
  <div :class="$style['wrapper']" @keyup.enter.stop.prevent="register">
    <CvForm :class="$style['register-box']" @submit.prevent="register">
      <h2 :class="$style['h2']">Register</h2>
      <p :class="$style['input-title']">Email</p>
      <CvTextInput type="email" v-model="form.userEmail" placeholder="Email" :invalid-message="formErrors.invalidEmail" @blur="checkEmailValidation"></CvTextInput>
      <p :class="$style['input-title']">Username</p>
      <CvTextInput v-model="form.username" placeholder="Nickname" :invalid-message="formErrors.invalidUsername" @blur="checkUsernameValidation"></CvTextInput>
      <p :class="$style['input-title']">First Name</p>
      <CvTextInput v-model="form.name" placeholder="Name" :invalid-message="formErrors.invalidName" @blur="checkNameValidation"></CvTextInput>
      <p :class="$style['input-title']">Surname</p>
      <CvTextInput v-model="form.surname" placeholder="Surname" :invalid-message="formErrors.invalidSurname" @blur="checkSurnameValidation"></CvTextInput>
      <p :class="$style['input-title']">Password</p>
      <CvTextInput v-model="form.password" placeholder="Password" :invalid-message="formErrors.invalidPassword" @blur="checkPasswordValidation"></CvTextInput>
      <CvButton>Create Account</CvButton>
    </CvForm>
    <CvToastNotification
      :class="[
        $style['notification'],
        {
          [$style['notification--opened']]: serverError,
          [$style['notification--closed']]: !serverError
        },
      ]"
      kind="error"
      title="Error"
      :caption="serverError"
      @close="serverError = null"
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
      form: {
        userEmail: null,
        username: null,
        password: null,
        name: null,
        surname: null
      },
      formErrors: {
        invalidEmail: null,
        invalidUsername: null,
        invalidName: null,
        invalidSurname: null,
        invalidPassword: null,
      },     
      serverError: null
    }
  },
  methods: {
    async register() {
      this.checkEmailValidation();
      this.checkUsernameValidation();
      this.checkNameValidation();
      this.checkSurnameValidation();
      this.checkPasswordValidation();
      this.serverError = null
      await axios.post('users/register', this.form)
        .catch((error) => this.serverError = error.response.data.msg[0])
      if (!this.serverError) {
        this.$router.push('/login');
      }
    },
    checkEmailValidation() {
      if(!this.form.userEmail) {
        this.formErrors.invalidEmail = 'Email required';
      } else {
        this.formErrors.invalidEmail = null;
      }
    },
    checkUsernameValidation() {
      if(!this.form.username) {
        this.formErrors.invalidUsername = 'Username required';
      } else if (this.form.username.length < 6) {
        this.formErrors.invalidUsername = 'Username should have at least 5 characters';
      } else {
        this.formErrors.invalidUsername = null;
      }
    },
    checkNameValidation() {
      if(!this.form.name) {
        this.formErrors.invalidName = 'Name required';
      } else if (this.form.name.length < 4) {
        this.formErrors.invalidName = 'Name should have at least 3 characters';
      } else if (!/^[A-Z]+$/.test(this.form.name[0])) {
        this.formErrors.invalidName = 'Name should be capitalized';
      } else if (!/^[a-z ,.'-]+$/.test(this.form.name.substring(1))) {
        this.formErrors.invalidName = 'Name has invalid characters';
      } else {
        this.formErrors.invalidName = null;
      }
    },
    checkSurnameValidation() {
      if(!this.form.surname) {
        this.formErrors.invalidSurname = 'Surname required';
      } if (this.form.surname.length < 4) {
        this.formErrors.invalidSurname = 'Surname should have at least 3 characters';
      } else if (!/^[A-Z]+$/.test(this.form.surname[0])) {
        this.formErrors.invalidSurname = 'Surnameame should be capitalized';
      } else if (!/^[a-z ,.'-]+$/.test(this.form.surname.substring(1))) {
        this.formErrors.invalidSurname = 'Surname has invalid characters';
      } else {
        this.formErrors.invalidSurname = null;
      }
    },
    checkPasswordValidation() {
      if(!this.form.password) {
        this.formErrors.invalidPassword = 'Password required';
      } else if (this.form.password.length < 4) {
        this.formErrors.invalidPassword = 'Surname should have at least 3 characters';
      } else {
        this.formErrors.invalidPassword = null;
      }
    }
  }
}
</script>

<style lang="scss" module>
@use 'sass:map';

@import '@carbon/themes/scss/themes';
@import '@/assets/_variables';

.h2 {
  font-size: 20px;
}

.input-title {
  padding: map.get($spacings, 5) 0 0;
}

.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  // color: $primary;
  // background-color: $background;
}

.register-box {
  margin-top: map.get($spacings, 8);
  width: 50%;
  height: 50%;
  // background-color: $secondary;
}

.notification {
  position: absolute;
  top: 5%;
  right: 5%;
  transition: 0.3s;
  opacity: 0;

  &--opened {
    opacity: 1;
    transition: 0.3s;
  }
}
</style>