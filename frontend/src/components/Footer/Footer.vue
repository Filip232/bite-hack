<template>
  <footer :class="$style.footer">
    <div :class="[$styleUtils['d-f'], $styleUtils['jc-sb']]">
      <div :class="$style['footer__left']">
        <img :class="[$style.logo, $styleUtils['mb-3']]" src="@/assets/logo.png" alt="Logo" >
        <a>
          Privacy Policy
        </a>
      </div>
      <div :class="[$style['footer__center'], $styleUtils['mb-3']]">
        <LogoFacebook32 />
        <LogoTwitter32 :class="$styleUtils['mx-4']" />
        <LogoGithub32 />
      </div>
      <div :class="[$style['footer__left'], $styleUtils['bc-transparent']]">
        <a>
          Our vision
        </a>
        <a>
          Team
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { LogoFacebook32, LogoTwitter32, LogoGithub32 } from '@carbon/icons-vue';
export default {
  name: 'Footer',
  components: {
    LogoFacebook32,
    LogoTwitter32,
    LogoGithub32
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';
@import '@carbon/colors/scss/colors';

.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: $carbon--gray-90;
  padding: $spacing-03 $spacing-04;
  position:absolute;
  bottom: 0;
  height: 90px;

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  &__center {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &__right {
    display: flex;
    flex-direction: column;
  }

  .logo {
    width: 50px;
    height: 50px;
  }
}
</style>
