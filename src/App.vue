<template>
  <div class="app_handler" v-if="loading">
    <base-loader></base-loader>
  </div>
  <component :is="layout" v-else>
    <router-view></router-view>
  </component>
</template>
<script>
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import ProfileLayout from './layouts/ProfileLayout.vue';
import BaseLoader from './components/UI/BaseLoader.vue';
export default {
  data(){
    return {
      loading: false
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  },
  components: {
    MainLayout, AuthLayout, ProfileLayout,
    BaseLoader
  },
  methods: {
    resizeWindow(){
        if(innerWidth < 750) 
          this.$store.state.adaptiveView = true
        else if(this.$store.state.adaptiveView)
          this.$store.state.adaptiveView = false
      }
  },
  async mounted() {
    this.loading = true
    await this.$store.dispatch('checkForAuth')
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
    this.loading = false
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: $font;
}
.app_handler {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba($dark-color, .9);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
