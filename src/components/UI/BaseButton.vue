<template>
  <button><slot></slot></button>
</template>

<script>
</script>

<style lang="scss">
    button {
        width: 100%;
        height: 45px;
        border-radius: 4px;
        border: none;
        background-color: $accent-color;
        color: $white-color;
        outline: none;
        font-size: 19px;
        cursor: pointer;
        transition: .3s;
        &:hover {
            background-color: $secondary-color;

        }
        &.danger {
            background-color: $danger-color;
            &:hover {
                filter: opacity(.85);
            }
        }
    }
</style>