<template>
    <div class="pt-80">
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
            @modal-hidden="modalHidden"
            @primary-click="addReview"
        >
            <template #title>
                Add review
            </template>
            <template #content>
                <span class="rating-text">Rate user!</span>
                <div>
                    <FaceDizzy32 class="rating-icon" :class="form.rating === 1 ? 'choosen' : ''" @click="form.rating = 1" />
                    <FaceDissatisfied32 class="rating-icon" :class="form.rating === 2 ? 'choosen' : ''" @click="form.rating = 2" />
                    <FaceNeutral32 class="rating-icon" :class="form.rating === 3 ? 'choosen' : ''" @click="form.rating = 3" />
                    <FaceActivated32 class="rating-icon" :class="form.rating === 4 ? 'choosen' : ''" @click="form.rating = 4" />
                    <FaceCool32 class="rating-icon" :class="form.rating === 5 ? 'choosen' : ''" @click="form.rating = 5" />
                </div>
                <div v-if="ratingInvalid" :class="[$styleUtils['mb-3'], $styleUtils['c-danger']]" v-text="ratingInvalid" />
                <CvTextArea
                    label="Comment content"
                    placeholder="comment"
                    v-model="form.comment"
                />
            </template>
            <template #secondary-button>
                Cancel
            </template>
            <template #primary-button>
                Add Comment
                <CvLoading v-if="isLoadingAddComment" :active="isLoadingAddComment" :class="$styleUtils['loading-small']"/>
            </template>
        </CvModal>
    </div>
</template>
<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { CvLoading, CvButton, CvModal, CvTextArea } from '@carbon/vue/src';
import { FaceActivated32, FaceCool32, FaceDizzy32, FaceDissatisfied32, FaceNeutral32 } from '@carbon/icons-vue';

export default {
    name: 'UserProfile',
    components: {
        CvLoading,
        CvButton,
        CvModal,
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
            form: {
                rating: null,
                comment: '',
            },
            isLoadingAddComment: false,
            ratingInvalid: null,
            serverError: null,
        };
    },
    created() {
        this.getUserData();
    },
    methods: {
        showModal() {
            this.addCommentVisible = true;
        },
        modalHidden() {
            this.addCommentVisible = false;
            this.form.rating = null;
        },
        ratingValidation() {
            if(this.form.rating === null) this.ratingInvalid = 'Rating is required';
            else this.ratingInvalid = null;
        },
        async addReview() {
            this.ratingValidation();
            if (this.form.rating === null) return;
            this.serverError = null;
            this.isLoadingAddComment = true;
            await axios.post('users/postReview', {
                posterId: this.$store.state.user.id,
                reviewedId: this.$route.params.id,
                rating: this.form.rating,
                comment: this.form.comment,
                token: this.$store.state.user.token,
            }).catch(err => {
                this.serverError = err.response.data.msg;
                this.isLoadingAddComment = false;
            });

            if (this.serverError) return;
            
            this.isLoadingAddComment = false;
            this.addCommentVisible = false;
            setTimeout(() => {
                this.getUserData();
            }, 500)
        },
        async getUserData() {
            this.isLoading = true;
            const userInfo = await axios.get(`users/${this.$route.params.id}`);
            this.userDetails.name = userInfo.data.name;
            this.userDetails.surname = userInfo.data.surname;
            this.userDetails.email = userInfo.data.email;
            this.userDetails.tel = userInfo.data.tel;
            this.userDetails.created = dayjs(userInfo.data.created).format('D MMMM YYYY');
            this.userDetails.imagePath = userInfo.data.imagePath;
            this.userDetails.avgRating = userInfo.data.avgRating;
            console.log(this.userDetails.avgRating);
            this.isLoading = false;
        }
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

.rating-icon {
    margin: 10px 5px;
    &:hover {
        color: #e4cd05;
    }
}

.rating-text {
    font-size: 0.75rem;
}
.choosen {
    color: $button-primary;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
