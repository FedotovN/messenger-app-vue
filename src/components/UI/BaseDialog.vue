<template>
  <div class="layer" @click="closeDialog">
    <div class="dialog_window" @click.stop>
        <div class="close_dialog" @click="closeDialog">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <slot>{{  }}</slot>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        closeDialog(){
            this.$emit('closeDialog')
        }
    }
}
</script>

<style lang="scss" scoped>
    .layer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($dark-color, .9);
        display: flex;
        justify-content: center;
        align-items: center;
        .dialog_window{
            position: relative;
            padding: 10px;
            min-width: 200px;
            background-color: $white-color;
            border-radius: 8px;
            .close_dialog {
                cursor: pointer;
                font-size: 24px;
                position: absolute;
                right: 11px;
                top: 5px;
                i {
                    transition: .3s;
                    &:hover {
                        color: $danger-color;
                    }
                }
            }
        }
    }
</style>