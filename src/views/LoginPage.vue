<template>
  <div class="auth_handler" v-if="loading">
    <base-loader></base-loader>
  </div>
  <form @submit.prevent="handleForm" class="login_form">
    <h3>Вход в аккаунт</h3>
    <div class="form_content">
      <div class="form_field">
        <base-input
          :autocomplete="'email'"
          :placehldr="'Введите почту'"
          :label="'Почта'"
          :class = "{
            'incorrect': v$.email.$errors.length
          }"
          v-model="email"
        />
        <small :class="{'visible': v$.email.$errors.length}">
          Введите корректный адрес электронной почты  
        </small>
      </div>
      <div class="form_field">
        <base-input
        :autocomplete="'current-password'"
        :placehldr="'Введите пароль'"
        :label="'Пароль'"
        :type="'password'"
        :class = "{
          'incorrect': v$.password.$errors.length
        }"
        v-model="password"
        />
        <small :class="{'visible': v$.password.$errors.length}">
          Минимальная длина пароля - 6 символов.<br>Текущая длина пароля - {{ password.length }}
        </small>
      </div>
    </div>
    <div class="form_ending">
      <base-button>Вход</base-button>
      <p>Нет аккаунта? <router-link to="/register">Присоединяйтесь</router-link></p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from "@vuelidate/validators"
export default {
  name: 'LoginPage',
  methods: {
    async handleForm(){
      this.v$.$validate()
      if(!this.v$.$errors.length){
        this.loading = true
        try {
          const userVals = {email: this.email, password: this.password}
          await this.$store.dispatch('signIn', userVals)
          this.$router.push('/')
        }
        catch(e){
          alert('Пользователь не найден :(')
          console.log(e)
        }
        this.loading = false
      }
    }
  },
  data() {
    return {
      loading: false,
      v$: useVuelidate(),
      email: '',
      password: '',
    }
  },
  validations() {
    return {
      email: {required, email},
      password: {required, minLength: minLength(6)}
    }
  }
}
</script>

<style lang="scss">
  .auth_handler {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($dark-color, .9);
  }
  .login_form {
    width: calc(100% - 25px);
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    h3 {
      padding-top: 10px;
    }
    .form_content {
      padding: 20px 0;
      flex: 1;
      display: flex;
      gap: 30px;
      flex-flow: column nowrap;
      .form_field {
        
        small {
          transition: .3s;
          opacity: 0;
          color: $danger-color;
          display: none;
          &.visible {
            display: inline;
            opacity: 1;
          }
        }
      }
    }
    .form_ending {
      justify-self: flex-end;
      padding-bottom: 20px;
      p {
        font-size: 14.5px;
        padding-top: 20px;
      }
    }
  }
</style>