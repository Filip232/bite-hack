<template>
    <div class="wrapper-edit">
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
        <h1>Edit Profile</h1>
        <CvForm @submit.prevent="updateProfile">
            <CvTextInput class="input" label="Email" type="email" v-model="form.email" placeholder="Email" :invalid-message="formErrors.invalidEmail" @blur="checkEmailValidation" />
            <CvTextInput class="input" label="Username" v-model="form.username" placeholder="Username" :invalid-message="formErrors.invalidUsername" @blur="checkUsernameValidation" />
            <CvTextInput class="input" label="Name" v-model="form.name" placeholder="Name" :invalid-message="formErrors.invalidName" @blur="checkNameValidation" />
            <CvTextInput class="input" label="Surname" v-model="form.surname" placeholder="Surname" :invalid-message="formErrors.invalidSurname" @blur="checkSurnameValidation" />
            <CvTextInput class="input" label="Password" type="password" v-model="form.password" placeholder="Password" :invalid-message="formErrors.invalidPassword" @blur="checkPasswordValidation" />
            <CvTextInput class="input" label="Telephone" v-model="form.telephone" placeholder="Telephone" />
            <CvButton :class="$styleUtils['mt-6']">Update profile</CvButton>
        </CvForm>
    </div>
</template>
<script>
import { CvForm, CvButton, CvTextInput, CvToastNotification } from '@carbon/vue/src';
import axios from 'axios';


export default {
    name: 'EditUser',
    components: {
        CvForm,
        CvButton,
        CvTextInput,
        CvToastNotification,
    },
    data() {
        return {
            form: {
                email: null,
                username: null,
                name: null,
                surname: null,
                password: null,
                telephone: null,
            },
            formErrors: {
                invalidEmail: null,
                invalidUsername: null,
                invalidName: null,
                invalidSurname: null,
                invalidPassword: null,
            },
            isLoading: false,
            serverError: null
        }
    },
    async created() {
        const { data } = await axios.get(`/users/${this.$store.state.user.id}`, {
            params: {
                id: this.$store.state.user.id,
            }
        });
        this.form.email = data.email;
        this.form.username = data.username;
        this.form.name = data.name;
        this.form.surname = data.surname;
        this.form.telephone = data.tel;
    },
    methods: {
        async editUser() {
            this.serverError = null
            this.isLoading = true;
            await axios.post('/users/updateUser', {
                username: this.form.username,
                name: this.form.name,
                surname: this.form.surname,
                tel: this.form.telephone,
                password: this.form.password,
                email: this.form.email,
                id: this.$store.state.user.id,
                token: this.$store.state.user.token,
            }).catch((error) => {
                this.serverError = error.response.data.msg
                this.isLoading = false;
            });
            if (!this.serverError) {
                this.isLoading = false;
                this.$router.push(`/users/${this.$store.state.user.id}`);
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
        },
        updateProfile() {
            this.checkEmailValidation();
            this.checkUsernameValidation();
            this.checkNameValidation();
            this.checkSurnameValidation();
            this.checkPasswordValidation();
            if(!this.formErrors.invalidEmail && !this.formErrors.invalidUsername && !this.formErrors.invalidName && !this.formErrors.invalidSurname && !this.formErrors.invalidPassword) {
                this.editUser();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@carbon/themes/scss/themes';

.input {
  padding: $spacing-04 0 0;
}

.wrapper-edit {
    width: 60%;
    margin: 0 auto;
    padding-top: 12vh;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
