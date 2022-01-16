<template>
  <div :class="[$style['wrapper'], $styleUtils['pt-13']]">
    <div v-if="productList.length" :class="$style['product-list']">
      <router-link v-for="product in productList" :key="product._id" :class="[$style['product'], $styleUtils['c-primary']]" :to="`/products/${product._id}`">
        <div :class="[$style['product__img-box']]">
          <img :class="$style['product__img']" :src="product.images[0]">
        </div>
        <div :class="$style['product__text']">
          <div :class="$styleUtils['mr-5']">
            <h5 :class="$styleUtils['mb-5']">{{ product.productName }}</h5>
            <p  :class="$style['description']">{{ product.description }}</p>
          </div>
          <div :class="$style['description-2-box']">
            <p  :class="$style['description-2']">{{ product.location }}</p>
            <p :class="$style['description-2']">{{ product.username }}</p>
            <CvButton >
              Order
          </CvButton>
          </div>
        </div>
      </router-link>
    </div>
    <div :class="[$styleUtils['d-f'], $styleUtils['jc-sb']]">
      <CvButton v-if="currentPage !== String(0)" @click="prevPage" >
        Previous Page
    </CvButton>
    <CvButton v-if="String(parseInt(currentPage)+1) !== String(maxPage)" @click="nextPage" >
      Next Page
    </CvButton>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Products',
  data() {
    return {
      currentPage: this.$route.params.page || '0',
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
  watch: {
    async $route() {
      const { data } = await axios.get(`/products/productList/${this.currentPage}`);
      this.productList = data.products;
    }
  },
  async created() {
    const { data } = await axios.get('/products/productList/0');
    if (this.currentPage < 0) this.currentPage = '0';
    this.maxPage = data.maxPage;
    this.productList = data.products;
  },
  methods: {
    nextPage() {
      this.currentPage = String(parseInt(this.currentPage) + 1);
      this.$router.push(`/products/all/${this.currentPage}`)
    },
    prevPage() {
      this.currentPage = String(parseInt(this.currentPage) - 1);
      this.$router.push(`/products/all/${this.currentPage}`)
    }
  }
}
</script>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>

<style lang="scss" module>
@use 'sass:map';

@import '@carbon/colors/scss/colors';
@import '@carbon/themes/scss/themes';

.wrapper {
  margin: 0 5vw;
  padding-bottom: $spacing-06;
}

.product-list {
  display: flex;
  flex-direction: column;
}

.product {
  display: flex;
  background-color: $carbon--gray-90;
  margin-bottom: $spacing-07;

  &__img {
    width: 100%;
    height: 100%;
    padding: $spacing-04;
    object-fit: contain;
    &-box {
      width: 150px;
      height: 100px;
    }
  }

  &__text {
    width: 100%;
    display: flex;
    flex-direction: row;
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
  margin-right: $spacing-05;
}

.description-2-box {
  display: flex;
  align-items: flex-end;
}
</style>
