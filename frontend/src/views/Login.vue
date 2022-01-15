<template>
    <div class="wrapper">
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
        <h2>Login to your account</h2>
        <CvForm @submit.prevent="login" class="login-form">
            <CvTextInput
                v-model="form.email"
                placeholder="Email"
                label="Email"
                :invalid-message="emailInvalid"
                @blur="emailValidation"
            />
            <CvTextInput
                v-model="form.password"
                type="password"
                placeholder="Password"
                label="Password"
                :class="$styleUtils['mt-4']"
                :invalid-message="passwordInvalid"
                @blur="passwordValidation"
            />
            <CvButton :class="$styleUtils['mt-6']" class="login-btn">
                    Log in
                    <CvLoading v-if="isLoading" :active="isLoading" :class="$styleUtils['loading-small']"/>
                </CvButton>
        </CvForm>
        <div class="navigation">
            <router-link to="/" v-text="'Back to home page'" :class="$styleUtils['p-2']" />
            <router-link to="/register" v-text="'Do not have account yet? Sign up!'" :class="$styleUtils['p-4']" />
        </div>
    </div>
</template>
<script>
import { CvForm, CvTextInput, CvToastNotification, CvLoading } from '@carbon/vue/src';
import axios from 'axios';

export default {
    name: 'Login',
    components: {
        CvForm,
        CvTextInput,
        CvToastNotification,
        CvLoading
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            emailInvalid: null,
            passwordInvalid: null,
            serverError: null,
            isLoading: false,
        }
    },
    methods: {
        async login() {
            this.emailValidation();
            this.passwordValidation();
            if (this.form.login === '' || this.form.password === '') return;
            this.serverError = null;
            this.isLoading = true;
            const { data } = await axios.post('users/login', {
                email: this.form.email,
                password: this.form.password
            }).catch(err => {
                this.serverError = err.response.data.msg;
                this.isLoading = false;
            });
            if (this.serverError) return;

            this.$store.commit('saveUserData', data);
            this.isLoading = false;
            this.$router.push('/');
        },
        emailValidation() {
            if(this.form.email === '') this.emailInvalid = 'Email is required';
            else this.emailInvalid = null;
        },
        passwordValidation() {
            if(this.form.password === '') this.passwordInvalid = 'Password is invalid';
            else this.passwordInvalid = null;
        }
    }
}
</script>

<style lang="scss">
@import '~@carbon/themes/scss/themes';

.login-form {
    width: 90%;
    margin: 5vh auto 0;
}

.wrapper {
    margin-top: 8vh;
    text-align: center;
}

.navigation {
    display: flex;
    flex-flow: column;
    width: 90%;
    margin: $spacing-08 auto 0;
}

.login-btn {
    width: 100%;
}

@media (min-width: 800px) {
    .login-form {
        width: 60%;
    }

    .navigation {
        width: 60%;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
    }

    .login-btn {
        width: 30%;
    }
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
