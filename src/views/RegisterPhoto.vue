<template>
  <div class="auth_handler" v-if="loading">
    <base-loader></base-loader>
  </div>
  <div class="photo_form">
    <h3>Никнейм - хорошо</h3>
    <p>Но куда без аватарки?</p>
    <div class="input_field" @click="$refs.input.click()">
        <img src="" alt="Profile photo" ref="imagePreview" class="hidden">
        <input ref="input" type="file" @change="fileLoaded">
        <p v-if="!file">700 кб</p>
        <i v-if="!file" class="fa-regular fa-file-image"></i>
    </div>
    <div class="form_end">
        <base-button v-if="file" @click="handleForm">Продолжить</base-button>
        <router-link to="/login">Пропустить</router-link>
    </div>
  </div>
</template>

<script>
import { storage } from "@/firebase/config"
import { ref, uploadString } from 'firebase/storage'
export default {
    data() {
        return {
            file: '',
            loading: false
        }
    },
    methods: {
        fileLoaded(e){
            this.loading = true
            const image = e.target.files[0],
            reader = new FileReader(),
            preview = this.$refs.imagePreview
            if(image.size / 1024 > 700) {
                alert('Извините, мы не принимаем картинки весом более 700 кб')
                this.loading = false
                return
            }
            
            preview.className = ''
            reader.onloadend = () => {
                this.file = reader.result
                preview.src = reader.result
                this.loading = false
            }
            
            reader.readAsDataURL(image)
        },
        async handleForm(){
            if(!this.file) return
            this.loading = true
            const uid = await this.$store.dispatch('getUid'),
                  reference = ref(storage, `usersPhotos/${uid}`)
            await uploadString(reference, this.file, 'data_url', {contentType: "image/jpeg"})
            this.loading = false

            await this.$store.dispatch('setUserPhoto')
            
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
    .photo_form {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        padding: 20px;
        .input_field {
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
        .form_end {
            width: 100%;
            padding-top: 20px;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            a {
                align-self: flex-end;
            }
            button {
                align-self: flex-start;
             }
        }
    }
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
</style>