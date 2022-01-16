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
    <CvForm :class="$style['register-box']" @submit.prevent="createAccount">
      <h2 :class="$style['h2']">Register</h2>
      <CvTextInput :class="$style['input']" label="Email" type="email" v-model="form.email" placeholder="Email" :invalid-message="formErrors.invalidEmail" @blur="checkEmailValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Username" v-model="form.username" placeholder="Username" :invalid-message="formErrors.invalidUsername" @blur="checkUsernameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Name" v-model="form.name" placeholder="Name" :invalid-message="formErrors.invalidName" @blur="checkNameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Surname" v-model="form.surname" placeholder="Surname" :invalid-message="formErrors.invalidSurname" @blur="checkSurnameValidation"></CvTextInput>
      <CvTextInput :class="$style['input']" label="Password" type="password" v-model="form.password" placeholder="Password" :invalid-message="formErrors.invalidPassword" @blur="checkPasswordValidation"></CvTextInput>
      <CvButton :class="$styleUtils['mt-6']">
        <span :class="isLoading ? $style['pr-10'] : $style['pr-30']">Create Account</span>
        <CvLoading v-if="isLoading" :active="isLoading" :class="$styleUtils['loading-small']"/>
      </CvButton>
    </CvForm>
    <div :class="$style['navigation']">
        <router-link to="/" v-text="'Back to home page'" :class="$styleUtils['p-2']" />
        <router-link to="/login" v-text="'Do you have account? Sign in!'" :class="$styleUtils['p-2']" />
    </div>
  </div>
</template>

<script>
import { CvButton, CvTextInput, CvForm, CvLoading } from '@carbon/vue'
import axios from 'axios';
import { CvToastNotification } from '@carbon/vue'

export default {
  name: 'RegisterPage',
  components: {
    CvButton,
    CvTextInput,
    CvForm,
    CvToastNotification,
    CvLoading,
  },
  data() {
    return {
      form: {
        email: null,
        username: null,
        name: null,
        surname: null,
        password: null
      },
      formErrors: {
        invalidEmail: null,
        invalidUsername: null,
        invalidName: null,
        invalidSurname: null,
        invalidPassword: null,
      },     
      serverError: null,
      isLoading: false,
    }
  },
  methods: {
    async register() {
      this.serverError = null
      this.isLoading = true;
      await axios.post('users/register', this.form)
        .catch((error) => {
          this.serverError = error.response.data.msg
          this.isLoading = false;
        })
      if (!this.serverError) {
        this.isLoading = false;
        this.$router.push('/login');
      }
    },
    createAccount() {
      this.checkEmailValidation();
      this.checkUsernameValidation();
      this.checkNameValidation();
      this.checkSurnameValidation();
      this.checkPasswordValidation();
      if(!this.formErrors.invalidEmail && !this.formErrors.invalidUsername && !this.formErrors.invalidName && !this.formErrors.invalidSurname && !this.formErrors.invalidPassword) {
        this.register();
      }
    },
    checkEmailValidation() {
      if(!this.form.email) {
        this.formErrors.invalidEmail = 'Email required';
      } else {
        this.formErrors.invalidEmail = null;
      }
    },
    checkUsernameValidation() {
      if(!this.form.username) {
        this.formErrors.invalidUsername = 'Username required';
      } else {
        this.formErrors.invalidUsername = null;
      }
    },
    checkNameValidation() {
      if(!this.form.name) {
        this.formErrors.invalidName = 'Name required';
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

.input {
  padding: $spacing-04 0 0;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2.5rem 0;
  // color: $primary;
  // background-color: $background;
}

.register-box {
  margin-top: $spacing-08;
  width: 40%;
  // background-color: $secondary;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: $spacing-08 auto 0;
}

.pr-10 {
  padding-right: 10px;
}
.pr-30 {
  padding-right: 30px;
}
</style>
