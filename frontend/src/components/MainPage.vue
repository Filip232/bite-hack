<template>
  <div>
  </div>
</template>

<script>

import { Button } from 'element-ui';
export default {
  name: 'MainPage',
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
        add: function () {
          if(this.lastStoredA && this.lastStoredB) {
            this.result = this.storedA + this.storedB;
            this.storedA = this.storedB = 0;
            this.lastStoredA = this.lastStoredB = 0;
          } else {
            this.message = 'choose all numbers'
          }
        },
        subtract: function () {
          if(this.lastStoredA && this.lastStoredB) {
            this.result = this.storedA - this.storedB;
            this.storedA = this.storedB = 0;
            this.lastStoredA = this.lastStoredB = 0;
          } else {
            this.message = 'choose all numbers'
          }
        },
        multi: function () {
          if(this.lastStoredA && this.lastStoredB) {
            this.result = this.storedA * this.storedB;
            this.storedA = this.storedB = 0;
            this.lastStoredA = this.lastStoredB = 0;
          }
          this.message = 'choose all numbers'
        },
        divi: function () {
          if(this.lastStoredA && this.lastStoredB) {
            if(!this.storedB) {
              this.message = 'Cant divide by 0, clear your last letter'
              return
            }
            this.result = this.storedA / this.storedB;
            this.storedA = this.storedB = 0;
            this.lastStoredA = this.lastStoredB = 0;
          } else {
            this.message = 'choose all numbers'
          }
        },
        storeVal: function (val) {
          this.message = ''
          if(!this.lastStoredA) {
            this.storedA = val;
            this.lastStoredA = true;
           } else {
            this.storedB = val;
            this.lastStoredB = true;
          }
        },
        clear: function () {
          if(this.lastStoredB) {
            this.storedB = 0;
            this.lastStoredB = false;
            return
          }
          if(this.lastStoredA) {
            this.storedA = 0;
            this.lastStoredA = false;
            return
          }
        }
      }
}
</script>


<style lang="scss" module>

</style>
