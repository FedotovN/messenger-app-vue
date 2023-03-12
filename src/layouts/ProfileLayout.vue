<template>
<div class="profile_layout_wrapper">
    <div class="profile_layout_content">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    body {
        min-height: 100vh;
        .profile_layout_wrapper {
           background-color: $dark-color;
           display: flex;
           justify-content: center;
           align-items: center;
           min-height: 100vh;
            .profile_layout_content {
                min-width: 300px;
                padding: 10px;
                min-height: 380px;
                background-color: $white-color;
                border-radius: 8px;
                display: flex;
                flex-flow: column nowrap;
            }
        }
    }
</style>