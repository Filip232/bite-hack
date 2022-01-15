<template>
    <div>
            <CvLoading :active="isLoading" :overlay="true" />
            Name: {{ userDetails.name }}<br>
            Surname: {{ userDetails.surname }}<br>
            Email: {{ userDetails.email }}<br>
            Telephone: {{ userDetails.tel }}<br>
            Profile was created: {{ userDetails.created }}
    </div>
</template>
<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { CvLoading } from '@carbon/vue/src';

export default {
    name: 'UserProfile',
    components: {
        CvLoading,
    },
    data() {
        return {
            userDetails: {
                name: null,
                surname: null,
                email: null,
                created: null,
                tel: null,
            },
            isLoading: false,
        };
    },
    async created() {
        this.isLoading = true;
        const { data } = await axios.get(`users/${this.$route.params.id}`);

        this.userDetails.name = data.name;
        this.userDetails.surname = data.surname;
        this.userDetails.email = data.email;
        this.userDetails.tel = data.tel;
        this.userDetails.created = dayjs(data.created).format('D MMMM YYYY');
        this.isLoading = false;
    }
}
</script>