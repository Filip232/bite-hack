<template>
  <div :class="$style.product">
    <CvLoading :active="isLoading" :overlay="true" />
    <div :class="$style['product__body']">
      <div :class="[$styleUtils['d-f'], $styleUtils['jc-se']]">
        <img v-for="img in product.images" :key="img" @click="changeImg(img)" :class="$style['product__body--image']" :src="img">
      </div>
      <img :class="$style['product__body--displayed']" :src="displayed"  />
      <h3 :class="[$styleUtils['mb-6'], $style['product__body--title']]"  v-text="product.title" />
      <p :class="$styleUtils['mb-5']">
        Category: {{ product.category }}
      </p>
      <p :class="$styleUtils['mb-5']">
        Location: {{ product.location }}
      </p>
      <p :class="$styleUtils['mb-5']" v-text="product.description" />
      <div :class="[$styleUtils['d-f'], $styleUtils['mb-6']]">
        <p :class="$styleUtils['mr-5']">
          User:
        </p>
        <router-link :to="`/users/${product.ownerId}`" v-text="product.username" />
      </div>
      <p v-if="product.rating !== -1" :class="$styleUtils['mb-5']">
        User rating: {{ product.rating }}
      </p>
      <CvButton>
        Order
      </CvButton>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { CvButton, CvLoading } from '@carbon/vue/src';
export default {
  name: 'ProductDetails',
  components: {
    CvButton,
    CvLoading
  },
  data() {
    return {
      product:
        {
          productName: null,
          description: null,
          category: null,
          username: null,
          location: null,
          ownerId: null,
          images: null,
          rating: null
        },
        isLoading: false,
        displayed: ''
    }
  },
  async created() {
    this.isLoading = true;
    const productInfo = await axios.get(`products/${this.$route.params.id}`);
    this.product.productName = productInfo.data.productName;
    this.product.description = productInfo.data.description;
    this.product.category = productInfo.data.category;
    this.product.username = productInfo.data.username;
    this.product.location = productInfo.data.location;
    this.product.ownerId = productInfo.data.ownerId;
    this.product.images = productInfo.data.images;
    this.product.rating = productInfo.data.avgRating;
    this.displayed = this.product.images[0];
    this.isLoading = false;
  },
  methods: {
    changeImg(img) {
      this.displayed = img;
    }
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

    &--displayed {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
      margin-bottom: $spacing-08;
    }

    &--image {
      display: block;
      
      flex: 0 1 auto;
      margin-bottom: $spacing-07;
      min-width: 5%;
      max-width: 25%;
    }

    &--title {
      font-size: map.get($heading-03, font-size);
    }
  }
}
</style>
