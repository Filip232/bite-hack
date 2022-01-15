<template>
  <div>
    <MainPage />
  </div>
</template>

<script>
import {
  // An object of all themes
  // themes,

//   // Direct theme values
  // white,
//   g10,
//   g90,
  g100,

//   // Specific token values
//   interactive01,
//   interactive02,
} from '@carbon/themes';

console.log(g100);

import MainPage from '@/components/MainPage/MainPage.vue'
export default {
  name: 'Home',
  components: {
    MainPage
  }

}
</script>

<style lang="scss" scoped>
@import '@carbon/themes/scss/themes';

.andziej {
  color: $active-01;
}
</style>
