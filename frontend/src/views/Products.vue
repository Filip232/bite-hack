<template>
  <div :class="[$style['wrapper'], $styleUtils['pt-13']]">
    <div :class="$style['product-list']">
      <div v-for="product in productList" :key="product._id" :class="$style['product']">
        <div :class="[$styleUtils['w-50p'], $style['product__img-box']]">
          <img :class="$style['product__img']" src="@/assets/szafa.png" alt="szafa">
        </div>
        <div :class="$styleUtils['w-50p']">
          <h3>{{ product.productName }}</h3>
          <p>{{ product.description }}</p>
          <p>{{ product.location }}</p>
        </div>
      </div>
    </div>
    <CvButton v-for="page in maxPage" :key="page">
      <router-link :to="`/products/${page}`">{{ page }}</router-link>
    </CvButton>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Products',
  data() {
    return {
      maxPage: 1,
      productList: {
        productName: null,
        images: [],
        ownerId: null,
        location: null,
        description: null,
        category: null
      }
    }
  },
  async created() {
    const data = await axios.get('/products/productList/0');
    this.maxPage = data.data.maxPage;
    this.productList = data.data.products;
    console.log(data)
  }
}
</script>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>

<style lang="scss" module>
@import '@carbon/colors/scss/colors';
@import '@carbon/themes/scss/themes';

.wrapper {
  margin: 0 auto;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 30%);
  column-gap: $spacing-08;
  justify-content: space-evenly;
}

.product {
  display: flex;
  background-color: $carbon--gray-90;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: fill;

    &-box {
      width: 1000px;
      height: 200px;
    }
  }
}
</style>
