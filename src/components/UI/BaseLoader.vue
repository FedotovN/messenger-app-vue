<template>
  <div class="loader">

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .loader {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 3px solid $grey-color;
        border-top-color: $accent-color;
        animation: rotate 1s infinite;
        &.medium {
            width: 50px;
            height: 50px;
        }
        &.small {
            width: 30px;
            height: 30px;
            border-width: 1.5px;
        }
        &.little {
            width: 18px;
            height: 18px;
            border-width: 1px;
        }
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>