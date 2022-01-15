<template>
  
</template>

<script>
export default {
  name: 'ErrorNotification'
}
</script>

<style lang="scss" module>
.notification {
  position: absolute;
  top: 5%;
  right: 5%;
  transition: 0.3s;
  opacity: 0;

  &--opened {
    opacity: 1;
    transition: 0.3s;
  }
}
</style>