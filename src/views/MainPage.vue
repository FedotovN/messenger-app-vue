<template>
  <div class="main_page_wrapper">
    <p>Используйте меню слева, чтобы начать общение 🌎</p>
  </div>
</template>

<script>
export default {
  methods: {
    async exit() {
      await this.$store.dispatch('logOut')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
  .main_page_wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 100vh;
    p {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid $grey-color;
      box-shadow: 5px 5px 10px 1px $grey-color;
    }
  }
</style>