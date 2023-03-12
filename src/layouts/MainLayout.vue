<template>
    <div class="main_layout_handler" v-if="loading">
        <base-loader></base-loader>
    </div>
    <div class="main_layout_wrapper" v-else>
        <base-sidebar
        :class="{
            'squeezed': $store.state.adaptiveView
            && $route.params.id,
            'fullscreen': $store.state.adaptiveView
            && !$route.params.id,
        }"
        :userInfo = "userInfo"
        ></base-sidebar>
        <main :class="{
            'fullscreen': $store.state.adaptiveView
            && $route.params.id,
            'squeezed': $store.state.adaptiveView
            && !$route.params.id
        }">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import BaseSidebar from '@/components/Main/BaseSidebar.vue';
export default {
    data(){
        return {
            userInfo: {},
            loading: true
        }
    },
    components: {
        BaseSidebar
    },
    async mounted(){
        try {
            this.loading = true
            this.userInfo = await this.$store.dispatch('getCurrentUserInfo')
        }
        catch(e) {
            console.log(e)
        }
        this.loading = false
    }
}
</script>

<style lang="scss">
    .main_layout_wrapper {
        display: flex;
        min-height: 100vh;
        width: 100%;
        justify-content: space-between;
        main {
            flex: 1;
        }
        .fullscreen {
            flex: 1;
            width: 100%;
        }
        .squeezed {
            display: none;
            width: 0;
            opacity: 0;
        }
    }
    .main_layout_handler {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($dark-color, .9);
    }
</style>