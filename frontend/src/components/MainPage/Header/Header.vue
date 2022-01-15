<template>
  <div :class="$style.header">
    <router-link :class="[$styleUtils['d-f']]" to="/">
      <img :class="[$style.logo, $styleUtils['as-c']]" src="@/assets/logo.png" alt="Logo" >
    </router-link>
    <div :class="$styleUtils['d-f']">
      <router-link :class="[$styleUtils['mr-5vw'], $styleUtils['as-c']]" to="/" v-text="'Test'" />
      <router-link :class="[$styleUtils['mr-5vw'], $styleUtils['as-c']]" to="/" v-text="'Test'" />
      <router-link :class="[$styleUtils['mr-5vw'], $styleUtils['as-c']]"  to="/" v-text="'Test'" />
      <router-link :class="[$styleUtils['mr-5vw'], $styleUtils['as-c']]"  to="/" v-text="'Test'" />
      <router-link :class="[$styleUtils['as-c']]"  to="/" v-text="'Test'" />
    </div>
    <div :class="$style.header__buttons">
      <router-link :class="[$style['header__buttons--link'], $styleUtils['mr-5']]" to="/login">
          <p :class="$style['header__buttons--text']">
            Log in
          </p>
          <Login16 />
      </router-link>
      <router-link :class="$style['header__buttons--link']" to="/register">
          <p :class="$style['header__buttons--text']">
            Register
          </p>
          <FaceActivatedAdd16 />
      </router-link>
    </div>
  </div>
</template>

<script>
import { Login16, FaceActivatedAdd16 } from '@carbon/icons-vue';
export default {
  name: 'Header',
  components: {
    Login16,
    FaceActivatedAdd16
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';
@import '@carbon/colors/scss/colors';

.header {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: $spacing-05;
  background-color: $carbon--gray-90;

  &__buttons {
    display: flex;

    &--link {
      align-self: center;
      display: flex;
      flex-direction: row;
      color: $carbon--white-0;
      background-color: $carbon--gray-60;
      padding: $spacing-03 $spacing-04;
      border-radius: 1rem;
    }

    &--text {
      padding-right: $spacing-03;
      background-color: transparent;
    }
  }

  .logo {
    width: 32px;
    height: 32px;
  }
}
</style>
