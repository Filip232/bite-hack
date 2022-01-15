<template>
  <div>
    <MainPage />
    <span class="andziej">
      LALalala
    </span>
  </div>
</template>

<script>
import {
  g100,
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
