<template>
    <div class="auth_page_wrapper">
        <div class="auth_form">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .auth_page_wrapper {
        min-height: 100vh;
        background-color: $dark-color;
        display: flex;
        justify-content: center;
        align-items: center;
        .auth_form {
            width: 320px;
            max-height: 720px;
            background-color: $white-color;
            border-radius: 8px;
            display: flex;
            justify-content: center;
        }
    }
</style>