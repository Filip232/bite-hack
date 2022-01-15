<template>
    <div class="pt-80">
        <div class="wrapper">
            <CvLoading :active="isLoading" :overlay="true" />
            <h1>User profile</h1>
            <div class="profile-wrapper">
                <div class="img-wrapper">
                    <img :src="userDetails.imagePath" class="profile-img" alt="Profile image"/>
                    <span class="img-update">Update image</span>
                </div>
                <div class="info-wrapper">
                    <span><span :class="$styleUtils['bold']">Name:</span> {{ userDetails.name }}</span>
                    <span><span :class="$styleUtils['bold']">Surname:</span> {{ userDetails.surname }}</span>
                    <span><span :class="$styleUtils['bold']">Email:</span> {{ userDetails.email }}</span>
                    <span><span :class="$styleUtils['bold']">Telephone:</span> {{ userDetails.tel }}</span>
                    <span><span :class="$styleUtils['bold']">Profile was created at:</span> {{ userDetails.created }}</span>
                    <span><span :class="$styleUtils['bold']">Average rating: </span> {{ userDetails.avgRating }}</span>
                    <CvButton v-if="!isMy" :class="$styleUtils['mt-6']">
                        <router-link :to="`/users/${this.$route.params.id}/edit`" class="edit-profile">Edit profile info</router-link>
                    </CvButton>
                </div>
            </div>
        </div>
        <div class="comments pt-80">
            <h2>Comments</h2>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { CvLoading, CvButton } from '@carbon/vue/src';

export default {
    name: 'UserProfile',
    components: {
        CvLoading,
        CvButton,
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
                avgRating: null,
            },
            isLoading: false,
            isMy: this.$store.state.user.id === this.$route.params.id,
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
        this.userDetails.avgRating = data.avgRating;
        this.isLoading = false;
    }
}
</script>

<style lang="scss" scoped>
@import '~@carbon/themes/scss/themes';

.profile-img {
    height: 150px;
    width: 150px;
    margin: 20px 0;
}

.wrapper {
    width: 80%;
    padding: 50px 0 80px;
    margin: 0 auto;
}
.profile-wrapper {
    display: flex;
    justify-content: space-around;
    flex-flow: row-reverse;
    align-items: center;
    padding-top: 50px;
}

h1 {
    text-align: center;
}

.pt-80 {
    padding-top: 80px;
}

.info-wrapper {
    display: flex;
    flex-flow: column;
    width: 50%;
    align-items: flex-start;

    & span {
        padding: 5px 0;
    }
}

.img-wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.edit-profile {
    color: $text-04;
}

.img-update {
    text-decoration: underline;
    cursor: pointer;
}

.comments {
    width: 80%;
    margin: 0 auto;
    border-top: thin solid $text-04;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
