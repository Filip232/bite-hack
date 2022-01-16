<template>
  <div :class="[$style['info'], $styleUtils['c-primary'], $styleUtils['pt-13']]">
    <h1 :class="[$styleUtils['mb-6'], $style['info--logo']]">
      Things at the attic
    </h1>
    <h2 :class="[$styleUtils['mb-5'], $style['info--sub']]">
      The place to reuse things
    </h2>
    <p :class="$styleUtils['mb-5']">
      If you need something or want to give a second life to a thing, you are in the right place
    </p>
  </div>
</template>

<script>
export default {
  name: 'HeadingText',
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/themes/scss/themes';

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
    &--logo {
      font-size: 72px;
      color: $button-primary;
    }
    &--sub {
      font-size: 1.5rem;
    }
}
</style>
