<template>
  <div :class="$style.modal">
    <CvButton :class="[$styleUtils['w-100p']]">
      <router-link :class="$styleUtils['c-primary']" :to="`/users/${userId}`">Profile info</router-link>
    </CvButton>
    <CvButton disabled :class="[$styleUtils['w-100p'], $style.disabled]">
      <router-link :class="$style['disabled--text']" to="/" v-text="'My products'" />
    </CvButton>
    <CvButton disabled :class="[$styleUtils['w-100p'], $style.disabled]">
      <router-link :class="$style['disabled--text']" to="/" v-text="'Add product'" />
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
import axios from 'axios';

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
    async logout() {
      await axios.post('/users/logout', {token: this.$store.state.user.token, id: this.$store.state.user.id})
      this.$store.commit('setToken', undefined)
    }
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>


<style lang="scss" module>
@import '@carbon/themes/scss/themes';
@import '@carbon/colors/scss/colors';

.modal {
  position: absolute;

  &__button {
    width: 100%;
  }
}

.disabled {
  background-color: $carbon--gray-60 !important;

  &--text {
    color: $carbon--gray-90 !important;
  }
}
</style>