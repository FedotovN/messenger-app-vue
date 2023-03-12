<template>
  <div class="profile_page_handler" v-if="loading">
    <base-loader></base-loader>
  </div>
  <div class="profile_page_wrapper" v-else>
    <div class="row">
      <h3>Профиль</h3>
      <base-button class="danger" @click="logOut">Выход</base-button>
    </div>
    <form @submit.prevent="handleForm">
      <div class="form_main">

        <div class="photo_wrapper">
          <div class="input_photo" @click="$refs.input.click()">
            <img :src="file" alt="Profile photo" ref="imagePreview" v-if="file">
            <input ref="input" type="file" @change="fileLoaded">
            <p v-if="!file">700 кб</p>
            <i v-if="!file" class="fa-regular fa-file-image"></i>
          </div>
        </div>

        <base-input
        v-model="name"
        :label="'Имя'"
        :placehldr="'Введите имя пользователя'"
        />
      </div>
        <div class="form_end">
          <base-button>Принять</base-button>
        </div>
    </form>
  </div>
</template>

<script>
import {storage} from '@/firebase/config'
import {ref, uploadString} from 'firebase/storage'

export default {
  name: 'ProfilePage',
  data(){
    return {
      loading: true,
      file: '',
      name: '',
      changed: false
    }
  },
  methods: {
    async handleForm(){
      this.loading = true
      this.$store.dispatch('setUserName', this.name)
      if(!this.file) return
      if(this.changed) {
        const uid = await this.$store.dispatch('getUid'),
              reference = ref(storage, `usersPhotos/${uid}`)
        await uploadString(reference, this.file, 'data_url', {contentType: "image/jpeg"})

        await this.$store.dispatch('setUserPhoto')
      }
      this.loading = false
      this.$router.push('/')
    },
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/login')
    },
    fileLoaded(e) {
      this.loading = true
      const image = e.target.files[0],
      reader = new FileReader()
      if(image.size / 1024 > 700) {
          alert('Извините, мы не принимаем картинки весом более 700 кб')
          this.loading = false
          return
      }
      
      reader.onloadend = () => {
        this.file = reader.result
        this.loading = false
        this.changed = true
      }
      
      reader.readAsDataURL(image)
    }
  },
  async mounted() {
    this.loading = true
    const info =  await this.$store.dispatch('getCurrentUserInfo') 
    this.name = info.name
    this.file = info.photoUrl
    
    this.loading = false
  }
}
</script>

<style lang="scss">
  .profile_page_wrapper {
    padding-bottom: 10px;
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    .row {
        display: flex;
        align-items: center;
        gap: 70px;
    }
    form {
      display: flex;
      flex-flow: column nowrap;
      padding-top: 20px;
      flex: 1;
      .form_main {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
        .photo_wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          .input_photo {
              cursor: pointer;
              margin-top: 20px;
              border: 3px dashed $grey-color;
              height: 150px;
              width: 150px;
              border-radius: 50%;
              display: flex;
              flex-flow: column nowrap;
              gap: 20px;
              justify-content: center;
              align-items: center;
              color: $grey-color;
              user-select: none;
              transition: .3s;
              overflow: hidden;
              img {
                  max-width: 100%;
                  object-fit: cover;
                  &.hidden {
                      display: none;
                  }
              }
              &:hover {
                  border-color: $accent-color;
                  color: $accent-color;
              }
              i {
                  font-size: 26px;
              }
              input {
                  display: none;
              }
          }
        }
      }
      .form_end {
        padding-top: 20px;
      }
    };
  }
  .profile_page_handler {
    z-index: 20;
    background-color: rgba($dark-color, .9);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>