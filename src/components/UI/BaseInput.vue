<template>
  <div class="input_field" ref="inputField">
    <label :for="index"
    v-if="label?.length"
    >
    {{ label }}
    </label>
    
    <input 
    ref="input"
    :autocomplete="autocomplete"
    :placeholder="placehldr"
    @input="updateInput"
    :type="type"
    :value="modelValue"
    :id="index"
    >
  </div>
</template>

<script>
export default {
    props: ['modelValue', 'placehldr', 'label', 'type', 'autocomplete'],
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
        if(this.$refs.inputField.classList.value.includes('chat_input')){
            this.$refs.input.focus()
        }
    }
}
</script>

<style lang="scss" scoped>
    .input_field {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 5px;
        input {
            height: 45px;
            width: calc(100% - 10px);
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #ccc;
            outline: none;
            padding-left: 10px;
            transition: .3s;
            &:focus {
                background-color: #eeeeee;
            }
        }
        label {
            font-size: 14px;
            padding-bottom: 5px;
        }
        &.incorrect {
            input {
                background-color: rgba($danger-color, .3);
            }
        }
        &.chat_input {
            height: 70px;
            input {
                height: 100%;
                border: none;
                font-size: 15.5px;
            }
        }
    }
</style>