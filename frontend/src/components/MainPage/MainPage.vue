<template>
  <div>
    <Header />
    <HeadingText />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainPage/Header/Header.vue'
import HeadingText from '@/components/MainPage/HeadingText/HeadingText.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'MainPage',
  components: {
    Header,
    Footer,
    HeadingText
  }
}
</script>
