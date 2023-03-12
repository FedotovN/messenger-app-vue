<template>
  <div class="sidebar_wrapper">
    <header>
        <base-search
        :placehldr="'Поиск по контактам'"
        v-model="search"
        ></base-search>
    </header>
    <contact-list
    :search = "search"
    ></contact-list>
    <router-link to="/profile" class="profile">
        <footer>
            <div class="image_wrapper">
                <img v-if="userInfo.photoUrl" :src="userInfo.photoUrl" :alt="userInfo.name">
            </div>    
            <p>{{ userInfo.name }}</p>
        </footer>
    </router-link>
  </div>
</template>

<script>
import ContactList from './ContactList.vue';
export default {
    data(){
        return {
            search: ''
        }
    },
    props: ['userInfo'],
    components: {
        ContactList
    }
}
</script>

<style lang="scss" scoped>
    .sidebar_wrapper {
        padding: 0 10px;
        min-width: 300px;
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
        
        header {
            height: 60px;
            gap: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            i {
                color: $dark-color;
                font-size: 22px;
                transition: .3s;
                &:hover {
                    color: $accent-color;
                }
            }
        }
        .profile {
            color: $dark-color;
            &:hover {
                background-color: rgba($accent-color, .2);
            }
        }
        footer {
            height: 70px;
            padding: 0 10px;
            border-top: 1px solid $grey-color;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .image_wrapper  {
                background-color: $grey-color;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
            p {
                max-width: 190px;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
</style>