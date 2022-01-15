<template>
  <div>
    <Header :class="$style.header" />
  </div>
</template>

<script>
import Header from '@/components/MainPage/Header/Header.vue'
export default {
  name: 'MainPage',
  components: {
    Header
  }
}
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: flex-end;
}
</style>
