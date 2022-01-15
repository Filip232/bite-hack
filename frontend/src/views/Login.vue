<template>
    <div>
        <CvForm @submit.prevent="login" class="login-form">
            <CvTextInput v-model="form.email" placeholder="Email" label="Email" />
            <CvTextInput v-model="form.password" type="password" placeholder="Password" label="Password" :class="$styleUtils['mt-4']"/>
            <CvButton :class="$styleUtils['mt-6']">Log in</CvButton>
        </CvForm>
    </div>
</template>
<script>
import { CvForm, CvTextInput } from '@carbon/vue/src';

export default {
    name: 'Login',
    components: {
        CvForm,
        CvTextInput,
    },
    data() {
        return {
            form: {
                email: null,
                password: null
            },
        }
    },
    methods: {
        login(ev) {
            console.log(ev);
        }
    }
}
</script>

<style lang="scss">
.login-form {
    width: 60%;
    margin: 10vh auto 0;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
