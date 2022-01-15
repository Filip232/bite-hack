<template>
  <div :class="$style.header">
    <div :class="$style.header__buttons">
      <CvButton>
        <p :class="$style['header__buttons--text']">
          Log in
        </p>
        <Login16 />
      </CvButton>
      <CvButton>
        <p :class="$style['header__buttons--text']">
          Register
        </p>
        <FaceActivatedAdd16 />
      </CvButton>
    </div>
    <div :class="[$style['header__info'], $styleUtils['c-primary']]">
      <h1 :class="$styleUtils['mb-6']">
        NAZWA TO JEST OSTATNIE
      </h1>
      <h2 :class="$styleUtils['mb-5']">
        The place to reuse things
      </h2>
      <p :class="$styleUtils['mb-5']">
        If you need something or want give a second life to a thing, you are in the right place
      </p>
    </div>
    <div>
      <router-link to="/login">
        Log in
      </router-link>
      <router-link to="/register">
        Register
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
    display: flex;
    justify-content: flex-end;
    margin-bottom: $spacing-10;
    &--text {
      padding-right: $spacing-03;
      background-color: transparent;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
