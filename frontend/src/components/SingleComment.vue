<template>
    <div class="wrapper-single-component">
        <div>
            Author: <router-link :to="`/users/${$props.userId}`">{{ $props.username }}</router-link>
        </div>
        <div class="comment-rating-section">
            Rating: 
            <FaceDizzy32 v-if="$props.rating === 1" class="rating-icon-comment" />
            <FaceDissatisfied32 v-else-if=" $props.rating === 2" class="rating-icon-comment" />
            <FaceNeutral32 v-else-if="$props.rating === 3" class="rating-ico-comment" />
            <FaceActivated32 v-else-if="$props.rating === 4" class="rating-icon-comment" />
            <FaceCool32 v-else class="rating-icon-comment" />
        </div>
        <p>
            {{ $props.comment }}
        </p>
    </div>
</template>
<script>
import { FaceActivated32, FaceCool32, FaceDizzy32, FaceDissatisfied32, FaceNeutral32 } from '@carbon/icons-vue';

export default {
    name: 'SingleComment',
    components: {
        FaceActivated32,
        FaceCool32,
        FaceDizzy32,
        FaceDissatisfied32,
        FaceNeutral32,
    },
    props: {
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            default: 'User did not comment',
        },
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~@carbon/themes/scss/themes';

.rating-icon-comment {
    margin-left: 15px;
    color: $button-primary;
}

.comment-rating-section {
    margin: 15px 0;
    display: flex;
    align-items: center;
}

.wrapper-single-component {
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: thin solid $text-04;
}
</style>
