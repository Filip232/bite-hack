<template>
  <div :class="$style.footer">
    <div>
      <p>LOGO</p>
      <a>
        Privacy Policy
      </a>
    </div>
    <div>
      <a>
        Our vision
      </a>
      <a>
        Team
      </a>
    </div>
    <div :class="$style.footer__buttons">
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
export default {
  name: 'Header',
  components: {
    CvButton
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@use 'sass:map';

@import '@/assets/_variables';

.header {
  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: map.get($spacings, 7);
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
