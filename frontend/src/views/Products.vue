<template>
  <div :class="[$style['wrapper'], $styleUtils['pt-13']]">
    <div :class="$style['product-list']">
      <div v-for="product in productList" :key="product._id" :class="$style['product']">
        <div :class="[$styleUtils['w-50p'], $style['product__img-box']]">
          <img :class="$style['product__img']" src="@/assets/szafa.png" alt="szafa">
        </div>
        <div :class="[$styleUtils['w-50p'], $style['product__text']]">
          <div>
            <h3 :class="$style['h3']">{{ product.productName }}</h3>
            <p  :class="$style['description']">{{ product.description }}</p>
          </div>
          <div :class="$style['description-2-box']">
            <p  :class="$style['description-2']">{{ product.location }}</p>
            <p :class="$style['description-2']">User Name</p>
          </div>
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
@use 'sass:map';

@import '@carbon/colors/scss/colors';
@import '@carbon/themes/scss/themes';

.wrapper {
  margin: 0 auto;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(3, 25%);
  column-gap: $spacing-08;
  row-gap: $spacing-08;
  justify-content: space-evenly;
}

.product {
  display: flex;
  background-color: $carbon--gray-90;

  &__img {
    width: 100%;
    height: 100%;
    padding: $spacing-04;
    object-fit: contain;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: $spacing-04 $spacing-04 $spacing-04 0;
  }
}

.description {
  font-size: 12px;
}

.description-2 {
  display: inline-block;
  font-size: 14px;
  text-align: end;
}

.description-2-box {
  display: flex;
  justify-content: space-between;
}
</style>
