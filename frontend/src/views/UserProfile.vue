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
                    <span><span :class="$styleUtils['bold']">Average rating: </span> {{ userDetails.avgRating === -1 ? 'This user has no ratings': userDetails.avgRating }}</span>
                    <CvButton v-if="!isMy" :class="$styleUtils['mt-6']">
                        <router-link :to="`/users/${this.$route.params.id}/edit`" class="edit-profile">Edit profile info</router-link>
                    </CvButton>
                </div>
            </div>
        </div>
        <div class="comments pt-80">
            <div class="comments-title-wrapper">
                <h2>Comments</h2>
                <CvButton @click="showModal">Add review!</CvButton>
            </div>
        </div>
        <CvModal
        :visible="addCommentVisible"
        @modal-hidden="addCommentVisible = false"
        >
            <template #title>
                Add review
            </template>
            <template #content>
                <CvForm>
                    <span>Rate user!</span>
                    <div>
                        <FaceDizzy32 class="rating-icon" />
                        <FaceDissatisfied32 class="rating-icon" />
                        <FaceNeutral32 class="rating-icon" />
                        <FaceActivated32 class="rating-icon" />
                        <FaceCool32 class="rating-icon" />
                    </div>
                    <CvTextArea label="Comment content" placeholder="comment" />
                </CvForm>
            </template>
        </CvModal>
    </div>
</template>
<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { CvLoading, CvButton, CvModal, CvForm, CvTextArea } from '@carbon/vue/src';
import { FaceActivated32, FaceCool32, FaceDizzy32, FaceDissatisfied32, FaceNeutral32 } from '@carbon/icons-vue';

export default {
    name: 'UserProfile',
    components: {
        CvLoading,
        CvButton,
        CvModal,
        CvForm,
        CvTextArea,
        FaceActivated32,
        FaceCool32,
        FaceDizzy32,
        FaceDissatisfied32,
        FaceNeutral32,
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
            addCommentVisible: false,
            console,
        };
    },
    async created() {
        this.isLoading = true;
        const userInfo = await axios.get(`users/${this.$route.params.id}`);
        this.userDetails.name = userInfo.data.name;
        this.userDetails.surname = userInfo.data.surname;
        this.userDetails.email = userInfo.data.email;
        this.userDetails.tel = userInfo.data.tel;
        this.userDetails.created = dayjs(userInfo.data.created).format('D MMMM YYYY');
        this.userDetails.imagePath = userInfo.data.imagePath;
        this.userDetails.avgRating = userInfo.data.avgRating;

        this.isLoading = false;
    },
    methods: {
        showModal() {
            this.addCommentVisible = true;
        },
    },
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

.comments-title-wrapper {
    display: flex;
    justify-content: space-between;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
