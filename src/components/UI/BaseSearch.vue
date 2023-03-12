<template>
    <div class="input_field">
      <input 
      :placeholder="placehldr"
      @input="updateInput"
      :type="type"
      :value="modelValue"
      :id="index"
      >
      <i class="fa-solid fa-search"></i>
    </div>
  </template>
  
  <script>
  export default {
      props: ['modelValue', 'placehldr', 'label', 'type'],
      data() {
          return {
              index: ''
          }
      },
      methods: {
          updateInput(event) {    
              this.$emit('update:modelValue', event.target.value)
        }
    },
    mounted() {
        this.index = Math.random()
    }
}
</script>

<style lang="scss" scoped>
    .input_field {
        position: relative;
        width: 100%;
        display: flex;
        border: 1px solid $grey-color;
        border-radius: 8px;
        overflow: hidden;
        input {
            font-size: 17px;
            height: 45px;
            width: calc(100% - 50px);
            outline: none;
            border: none;
            padding-left: 10px;
            transition: .3s;
        }
        i {
            font-size: 18px;
            position: absolute;
            right: 15px;
            top: 15px;
            color: $grey-color;
        }
    }
</style>