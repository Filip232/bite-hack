<template>
  <div :class="$style['wrapper']">
    <div :class="$style['register-box']">

    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage'
}
</script>

<style lang="scss" module>
@import '@/assets/_variables';

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $primary;
}

.register-box {
  width: 50%;
  height: 50%;
  background-color: $secondary;
}
</style>