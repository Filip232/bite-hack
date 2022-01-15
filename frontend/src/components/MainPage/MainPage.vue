<template>
  <div>
    <cv-button>
      Test
    </cv-button>
    <CvCheckbox>
      1
    </CvCheckbox>
  </div>
</template>

<script>
import { CvButton, CvCheckbox } from '@carbon/vue/src';
export default {
  name: 'MainPage',
  components: {
    CvButton,
    CvCheckbox
  },
  data: function () {
    return {
      result: 0,
      storedA: 0,
      storedB: 0,
      lastStoredA: false,
      lastStoredB: false,
      message: ''
    }
  },
  methods: {
  }
}
</script>


<style lang="scss" module>

</style>
