<template>
  <div>
    <HeadingText />
    <Content />
  </div>
</template>

<script>
import Content from '@/components/MainPage/Content/Content.vue'
import HeadingText from '@/components/MainPage/HeadingText/HeadingText.vue'

export default {
  name: 'MainPage',
  components: {
    Content,
    HeadingText
  }
}
</script>
