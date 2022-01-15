<template>
    <div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Register',

    async mounted() {
        const { data } = await axios.get('users');
        console.log(data);
    }
}
</script>
