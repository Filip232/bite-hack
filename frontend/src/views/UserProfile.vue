<template>
    <div>
            <CvLoading :active="isLoading" :overlay="true" />
            <div class="profile-wrapper">
                <img :src="userDetails.imagePath" class="profile-img" alt="Profile image"/>
                <span><span :class="$styleUtils['bold']">Name:</span> {{ userDetails.name }}</span>
                <span><span :class="$styleUtils['bold']">Surname:</span> {{ userDetails.surname }}</span>
                <span><span :class="$styleUtils['bold']">Email:</span> {{ userDetails.email }}</span>
                <span><span :class="$styleUtils['bold']">Telephone:</span> {{ userDetails.tel }}</span>
                <span><span :class="$styleUtils['bold']">Profile was created:</span> {{ userDetails.created }}</span>
            </div>
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
                imagePath: null,
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
        this.userDetails.imagePath = data.imagePath;
        this.isLoading = false;
    }
}
</script>

<style lang="scss" scoped>
.profile-img {
    height: 150px;
    width: 150px;
}

.profile-wrapper {
    display: flex;

}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
