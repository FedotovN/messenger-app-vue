<template>
  <div class="auth_handler" v-if="loading">
    <base-loader></base-loader>
  </div>
  <form @submit.prevent="handleForm" class="register_form">
    <h3>Регистрация</h3>
    <div class="form_content">
      <div class="form_field">
        <base-input
          :autocomplete="'nickname'"
          :placehldr="'Введите имя'"
          :label="'Имя пользователя'"
          :class = "{
            'incorrect': v$.name.$errors.length
          }"
          v-model="name"
        />
        <small :class="{'visible': v$.name.$errors.length}">
          Введите имя пользователя
        </small>
      </div>
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
        :autocomplete="'new-password'"
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
      <div class="form_field">
        <base-input
        :autocomplete="'off'"
        :placehldr="'Повторите пароль'"
        :label="'Повторите пароль'"
        :type="'password'"
        :class = "{
          'incorrect': v$.repeatPassword.$errors.length
        }"
        v-model="repeatPassword"
        />
        <small :class="{'visible': v$.repeatPassword.$errors.length}">
          Введённое значение не равно паролю
        </small>
      </div>
      <div class="check_box" :class="{'incorrect': v$.check.$errors.length}">
        <input type="checkbox" name="" id="check" v-model="check">
        <label for="check">Алина Овчинникова - лучшая девочка</label>
      </div>
    </div>
    <div class="form_ending">
      <base-button>Регистрация</base-button>
      <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, email  } from '@vuelidate/validators';
export default {
  data() {
    return {
      v$: useVuelidate(),
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      check: '',
      loading: false
    }
  },
  validations() {
    return {
      name: { required },
      email: {required, email},
      password: {required, minLength: minLength(6)},
      repeatPassword: {required, sameAs: sameAs(this.password)},
      check: {required}
    }
  },
  methods: {
    async handleForm(){
      this.v$.$validate()
      if(!this.v$.$errors.length){ 
        try{
          this.loading = true
          const newUser = {email: this.email, password: this.password, name: this.name}
          await this.$store.dispatch('signUp', newUser)
          this.$router.push('/register/photo')
        }
        catch(e) {
          alert('При регистрации что-то пошло не так')
          console.log(e)
        }
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .register_form {
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
        gap: 10px;
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
        .check_box {
          display: flex;
          gap: 15px;
          padding: 10px 0;
          label {
            font-size: 13px;
            cursor: pointer;
            user-select: none;
          }
          input {
            margin-left: 1px;
            transform: scale(1.35);
            border: 1px solid $grey-color;
          }
          &.incorrect {
            background-color: rgba($danger-color, .3);
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