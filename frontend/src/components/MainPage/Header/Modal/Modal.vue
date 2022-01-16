<template>
  <div :class="$style.modal">
    <CvButton :class="$styleUtils['w-100p']">
      <router-link :to="`/users/${userId}`">Profile info</router-link>
    </CvButton>
    <CvButton :class="$styleUtils['w-100p']">
      <router-link to="/" v-text="'My products'" />
    </CvButton>
    <CvButton :class="$styleUtils['w-100p']">
      <router-link to="/" v-text="'Add product'" />
    </CvButton>
    <CvButton @click="logout" :class="$styleUtils['w-100p']">
      <p v-text="'Logout'" />
      <Logout16 />
    </CvButton>
  </div>
</template>

<script>
import { Logout16 } from '@carbon/icons-vue';
import { CvButton } from '@carbon/vue/src';

export default {
  name: 'Modal',
  props: {
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  components: {
    Logout16,
    CvButton
  },
  methods: {
    logout() {
      this.$store.commit('setToken', undefined)
    }
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>


<style lang="scss" module>
.modal {
  position: absolute;

  &__button {
    width: 100%;
  }
}
</style>