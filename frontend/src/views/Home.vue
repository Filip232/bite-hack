<template>
    <MainPage />
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
