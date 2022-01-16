<template>
    <div :class="$style['my-products-wrapper']">
        <h1 :class="$styleUtils['mb-6']">My Products:</h1>
        <router-link v-for="product in products" :key="product._id" :class="[$style['product'], $styleUtils['c-primary']]" :to="`/products/${product._id}`">
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
            </div>
            </div>
        </router-link>
    </div>
</template>
<script>import axios from "axios";

export default {
    name: 'MyProducts',
    data() {
        return {
            products: [],
        };
    },
    async created() {
        const { data } = await axios.get(`users/myAllProducts/${this.$store.state.user.id}`);
        console.log(data);
        this.products = data.myProducts;
    }

}
</script>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>

<style lang="scss" module>
@use 'sass:map';

@import '@carbon/colors/scss/colors';
@import '@carbon/themes/scss/themes';

.my-products-wrapper {
    padding-top: 13vh;
    width: 70%;
    margin: 0 auto;
}

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
