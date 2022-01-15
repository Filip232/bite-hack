<template>
  <div :class="$style['wrapper']">
    <CvToastNotification
      :class="[
        $styleUtils['notification'],
        {
          [$styleUtils['notification--opened']]: serverError,
          [$styleUtils['notification--closed']]: !serverError
        },
      ]"
      kind="error"
      title="Error"
      :caption="serverError"
      @close="serverError = null"
    />
    <CvForm :class="$style['register-box']" @submit.prevent="register">
      <h2 :class="$style['h2']">Register</h2>
      <CvTextInput :class="$style['input']" label="Email" type="email" v-model="form.userEmail" placeholder="Email" :invalid-message="formErrors.invalidEmail" @blur="checkEmailValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Username" v-model="form.username" placeholder="Username" :invalid-message="formErrors.invalidUsername" @blur="checkUsernameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Name" v-model="form.name" placeholder="Name" :invalid-message="formErrors.invalidName" @blur="checkNameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Surname" v-model="form.surname" placeholder="Surname" :invalid-message="formErrors.invalidSurname" @blur="checkSurnameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Password" type="password" v-model="form.password" placeholder="Password" :invalid-message="formErrors.invalidPassword" @blur="checkPasswordValidation"></CvTextInput>
      <CvButton :class="$styleUtils['mt-6']">Create Account</CvButton>
    </CvForm>
    <div :class="$style['navigation']">
        <router-link to="/home" v-text="'Back to home page'" :class="$styleUtils['p-2']" />
        <router-link to="/login" v-text="'Do you have account? Sign in!'" :class="$styleUtils['p-2']" />
    </div>
  </div>
</template>

<script>
import { CvButton, CvTextInput, CvForm } from '@carbon/vue'
import axios from 'axios';
import { CvToastNotification } from '@carbon/vue'

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

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>

<style lang="scss" module>
@use 'sass:map';

@import '@carbon/themes/scss/themes';
@import '@/assets/_variables';

.input {
  padding: map.get($spacings, 4) 0 0;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // color: $primary;
  // background-color: $background;
}

.register-box {
  margin-top: $spacing-08;
  width: 50%;
  height: 50%;
  // background-color: $secondary;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: $spacing-08 auto 0;
}
</style>