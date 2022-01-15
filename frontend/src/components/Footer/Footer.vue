<template>
  <div :class="$style.footer">
    <div :class="$style['footer__left']">
      <p>LOGO</p>
      <a>
        Privacy Policy
      </a>
    </div>
    <div :class="[$style['footer__center'], $styleUtils['bc-transparent']]">
      <a :class="[$styleUtils['bc-transparent']]">
        Our vision
      </a>
      <a :class="[$styleUtils['bc-transparent']]">
        Team
      </a>
      <a :class="[$styleUtils['bc-transparent']]">
        FAQ
      </a>
    </div>
    <div>
      <LogoFacebook32 />
      <LogoTwitter32 />
      <LogoDiscord32 />
    </div>
    <div :class="$style['footer__right']">
      <CvButton>
        Log in
      </CvButton>
      <CvButton>
        Register
      </CvButton>
    </div>
  </div>
</template>

<script>
import { CvButton } from '@carbon/vue/src';
import { LogoFacebook32, LogoTwitter32, LogoDiscord32 } from '@carbon/icons-vue';
export default {
  name: 'Footer',
  components: {
    CvButton,
    LogoFacebook32,
    LogoTwitter32,
    LogoDiscord32
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';
@import '@carbon/colors/scss/colors';

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: $carbon--gray-90;

  &__left {
    display: flex;
    flex-direction: column;
  }

  &__center {
    display: flex;
    flex-direction: column;
  }

  &__right {
    display: flex;
    flex-direction: column;
  }
  // &__buttons {
  //   display: flex;
  //   justify-content: flex-end;
  // }

  // &__info {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  // }
}
</style>
