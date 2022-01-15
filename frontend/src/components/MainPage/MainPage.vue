<template>
  <div>
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainPage/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'MainPage',
  components: {
    Header,
    Footer
  }
}
</script>
