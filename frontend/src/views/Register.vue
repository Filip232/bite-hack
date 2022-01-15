<template>
    <div>
      <RegisterPage />
    </div>
</template>

<script>
import axios from 'axios';
import RegisterPage from '@/components/RegisterPage.vue'

export default {
    name: 'Register',
    components: {
      RegisterPage
    },
    async mounted() {
        const { data } = await axios.get('users');
        console.log(data);
    }
}
</script>
