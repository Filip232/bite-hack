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
                    <CvButton v-if="isMy" :class="$styleUtils['mt-6']">
                        <router-link :to="`/users/${this.$route.params.id}/edit`" class="edit-profile">Edit profile info</router-link>
                    </CvButton>
                </div>
            </div>
        </div>
        <div class="comments pt-80">
            <div class="comments-title-wrapper">
                <h2>Comments</h2>
                <CvButton v-if="!userDetails.review.id" @click="showModal">Add review!</CvButton>
                <CvButton v-if="userDetails.review.id" @click="showModalEdit">Edit your review!</CvButton>
            </div>
            <div v-if="userDetails.review.id" class="your-comment-section">
                <h4>Your Comment</h4>
                <div class="comment-rating-section">
                    Rating: 
                    <FaceDizzy32 v-if="userDetails.review.rating === 1" class="rating-icon-comment" />
                    <FaceDissatisfied32 v-else-if="userDetails.review.rating === 2" class="rating-icon-comment" />
                    <FaceNeutral32 v-else-if="userDetails.review.rating === 3" class="rating-ico-comment" />
                    <FaceActivated32 v-else-if="userDetails.review.rating === 4" class="rating-icon-comment" />
                    <FaceCool32 v-else class="rating-icon-comment" />
                </div>
                <p>
                    {{ userDetails.review.comment }}
                </p>
            </div>
            <div class="other-comments-section">
                <h4>Other Comments</h4>
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
        <CvModal
            :visible="editCommentVisible"
            @modal-hidden="modalHiddenEdit"
            @primary-click="editReview"
        >
            <template #title>
                Edit review
            </template>
            <template #content>
                <span class="rating-text">Rate user!</span>
                <div>
                    <FaceDizzy32 class="rating-icon" :class="edit.rating === 1 ? 'choosen' : ''" @click="edit.rating = 1" />
                    <FaceDissatisfied32 class="rating-icon" :class="edit.rating === 2 ? 'choosen' : ''" @click="edit.rating = 2" />
                    <FaceNeutral32 class="rating-icon" :class="edit.rating === 3 ? 'choosen' : ''" @click="edit.rating = 3" />
                    <FaceActivated32 class="rating-icon" :class="edit.rating === 4 ? 'choosen' : ''" @click="edit.rating = 4" />
                    <FaceCool32 class="rating-icon" :class="edit.rating === 5 ? 'choosen' : ''" @click="edit.rating = 5" />
                </div>
                <CvTextArea
                    label="Comment content"
                    placeholder="comment"
                    v-model="edit.comment"
                />
            </template>
            <template #secondary-button>
                Cancel
            </template>
            <template #primary-button>
                Edit Comment
                <CvLoading v-if="isLoadingEditComment" :active="isLoadingEditComment" :class="$styleUtils['loading-small']"/>
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
                review: {
                    rating: null,
                    comment: null
                }
            },
            isLoading: false,
            isMy: this.$store.state.user.id === this.$route.params.id,
            addCommentVisible: false,
            editCommentVisible: false,
            form: {
                rating: null,
                comment: '',
            },
            edit: {
                rating: null,
                comment: '',
            },
            isLoadingAddComment: false,
            isLoadingEditComment: false,
            ratingInvalid: null,
            serverError: null,
            commentPage: 0,
            commentLimit: 50,

        };
    },
    async created() {
        this.getUserData();
        const reviews = await axios.get(`users/reviews/${this.commentPage}`, {
            params: {
                limit: this.commentLimit,
                userId: this.$route.params.id,
            },
        });
        console.log(reviews.data);
    },
    methods: {
        showModal() {
            this.addCommentVisible = true;
        },
        showModalEdit() {
            this.editCommentVisible = true;
        },
        modalHidden() {
            this.addCommentVisible = false;
            this.form.rating = null;
        },
        modalHiddenEdit() {
            this.editCommentVisible = false;
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
            this.form.rating = null;
            this.form.comment = '';
            setTimeout(() => {
                this.getUserData();
            }, 500);
        },
        async editReview() {
            this.isLoadingEditComment = true;
            await axios.post('users/updateReview', {
                posterId: this.$store.state.user.id,
                reviewedId: this.$route.params.id,
                rating: this.edit.rating,
                comment: this.edit.comment,
                token: this.$store.state.user.token,
            }).catch(() => {
                this.isLoadingEditComment = false;
            });
            this.isLoadingEditComment = false;
            this.editCommentVisible = false;
            setTimeout(() => {
                this.getUserData();
            }, 500);
        },
        async getUserData() {
            this.isLoading = true;
            const userInfo = await axios.get(`users/${this.$route.params.id}`, {
                params: {
                    id: this.$store.state.user.id,
                }
            });
            this.userDetails.name = userInfo.data.name;
            this.userDetails.surname = userInfo.data.surname;
            this.userDetails.email = userInfo.data.email;
            this.userDetails.tel = userInfo.data.tel;
            this.userDetails.created = dayjs(userInfo.data.created).format('D MMMM YYYY');
            this.userDetails.imagePath = userInfo.data.imagePath;
            this.userDetails.avgRating = userInfo.data.avgRating;
            this.userDetails.review = {
                rating: userInfo.data?.review?.rating || null,
                comment: userInfo.data?.review?.comment || null,
                id: userInfo.data?.review?.id || null,
            }
            this.edit.rating = userInfo.data?.review?.rating || null;
            this.edit.comment = userInfo.data?.review?.comment || '';

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

.rating-icon-comment {
    margin-left: 15px;
    color: $button-primary;
}

.comment-rating-section {
    margin: 15px 0;
    display: flex;
    align-items: center;
}

.your-comment-section {
    padding: 30px 0;
    border-bottom: 2px solid $text-04;
}

.other-comments-section {
    padding: 30px 0 100px;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
