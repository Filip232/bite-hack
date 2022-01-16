<template>
  <div :class="[$style.banner]">
    <div :class="$style['banner__row']">
      <Store32 :class="[$style['banner__row--icon']]" />
      <router-link :class="$style['banner__row--button']" v-text="'Check out our market'" to="/login" />
    </div>
    <div :class="$style['banner__row']">
      <router-link :class="$style['banner__row--button']" v-text="'Create an offer'" to="/login" />
      <DeliveryParcel32 :class="$style['banner__row--icon']" />
    </div>
    <router-link to="users/61e3420253bdd530bf179044">Test</router-link>
  </div>
</template>

<script>
import { Store32, DeliveryParcel32 } from '@carbon/icons-vue';
export default {
  name: 'Content',
  components: {
    Store32,
    DeliveryParcel32
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/colors/scss/colors';
@import '@carbon/themes/scss/themes';

.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: $spacing-08;
  &__row {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: space-around;
    margin-bottom: $spacing-07;

    &--icon {
      width: $spacing-09;
      height: $spacing-09;
    }

    &--button {
      padding: $spacing-04 $spacing-06;
      border-radius: 1.5rem;
      background-color: $carbon--gray-70;
      color: $carbon--white-0;
    }
  }
}

</style>
