<template>
  <div :class="$style.header">
    <div :class="$style.header__buttons">
      <router-link to="/login">
        <CvButton>
          <p :class="$style['header__buttons--text']">
            Log in
          </p>
          <Login16 />
        </CvButton>
      </router-link>
      <router-link to="/register">
        <CvButton>
          <p :class="$style['header__buttons--text']">
            Register
          </p>
          <FaceActivatedAdd16 />
        </CvButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Login16, FaceActivatedAdd16 } from '@carbon/icons-vue';
import { CvButton } from '@carbon/vue/src';
export default {
  name: 'Header',
  components: {
    CvButton,
    Login16,
    FaceActivatedAdd16
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';

.header {
  &__buttons {
    position: fixed;
    right: 0;
    top: 0;

    &--text {
      padding-right: $spacing-03;
      background-color: transparent;
    }
  }
}
</style>
