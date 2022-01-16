<template>
  <div :class="$style.product">
    <div :class="$style['product__body']">
      <img :class="$style['product__body--image']" src="@/assets/szafa.png">
      <h3 :class="[$styleUtils['mb-6'], $style['product__body--title']]"  v-text="product.title" />
      <p :class="$styleUtils['mb-5']">
        Category: {{ product.category }}
      </p>
      <p :class="$styleUtils['mb-5']" v-text="product.description" />
      <div :class="[$styleUtils['d-f'], $styleUtils['mb-6']]">
        <p :class="$styleUtils['mr-5']">
          User:
        </p>
        <router-link :to="`/users/${product.ownerId}`" v-text="product.user" />
      </div>
      <CvButton>
        Order
      </CvButton>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import { CvButton } from '@carbon/vue/src';
export default {
  name: 'ProductDetails',
  components: {
    CvButton
  },
  data() {
    return {
      product:
        {
          id: '1',
          title: 'Piekna szafa',
          description: 'Ladna, stara, ale dobra, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus ipsum quis orci tempor maximus. Integer posuere cursus sem, a ultrices enim maximus id. Mauris posuere, dolor sit amet sodales facilisis, augue diam pellentesque purus, vitae euismod augue est vel quam. Maecenas maximus mauris id eros maximus consectetur.',
          image: '@/assets/szafa.png',
          category: 'other',
          user: 'Jan Kowalski',
          ownerId: '61e3420253bdd530bf179044'
        },
        isLoading: false
    }
  },
  async created() {
    this.isLoading = true;
    //const productInfo = await axios.get(`products/1`);
    this.isLoading = false;
  }
}
</script>

<style src="@/assets/utils.module.scss" lang="scss" module="$styleUtils"></style>

<style lang="scss" module>
@use 'sass:map';

@import '@carbon/themes/scss/themes';
@import '@carbon/colors/scss/colors';

.product {
  padding-top: 12vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 2vw;
  &__body {
    background-color: $carbon--gray-60;
    padding: $spacing-06 $spacing-05;

    &--image {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: $spacing-07;
      width: 40%;
    }

    &--title {
      font-size: map.get($heading-03, font-size);
    }
  }
}
</style>
