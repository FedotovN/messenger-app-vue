<template>
<router-link :to="contact.uid" @click="setChat">
  <div class="contact_wrapper">
    <div class="image_wrapper">
        <div class="image">
            <img v-if="photoUrl" :src="photoUrl" :alt="contact.name">
        </div>
        <div class="auth_status" :class="{
            'online': status === 'online'
        }"></div>
    </div>
    <div
    class="column"
    :class="{'unwrapped': $store.state.adaptiveView}"
        >
        <div class="row">
            <p>{{ name }}</p>
            <p class="unread_messages" v-if="contact.unreadMessages && this.$route.params.id != contact.uid">{{ contact.unreadMessages }}</p>
        </div>
        <div
        class="row"
        v-if="contact.lastMessage">
            <small> {{ contact.lastMessage.name + ': ' + contact.lastMessage.text }}</small>
            <small>{{ fixDate(contact.lastMessage.createdAt) }}</small>
        </div>
    </div>
  </div>
</router-link>
</template>

<script>
import { store } from "@/firebase/config"
import { onSnapshot, doc, query } from '@firebase/firestore'
import { dateFilter } from "@/utils/dateFilter"
export default {
    props: ['contact'],
    data() {
        return {
            status: 'offline',
            photoUrl: '',
            name: '',
            unsubFunc: null
        }
    },
    methods: {
        setChat(){
            this.$store.commit('setCurrChat', this.contact.uid)
            this.$store.commit('setCurrContactName', this.contact.name)
            this.$store.commit('setCurrContactPhoto', this.photoUrl)
        },
        fixDate(date) {
            return dateFilter.filterDate(date)
        }
    },
    async mounted() {
        const colRef = doc(store, `users/${this.contact.uid}`),
        q = query(colRef)
        this.unsubFunc = onSnapshot(q, (s) => {
            this.photoUrl = s.data().info.photoUrl
            this.status = s.data().info.status
            this.name = s.data().info.name
        })
    },
    unmounted() {
        this.unsubFunc()
    }
}
</script>

<style lang="scss" scoped>
    .contact_wrapper {
        color: $dark-color;
        width: calc(100% - 20px);
        height: 90px;
        padding: 0 10px;
        border-bottom: 1px solid $grey-color;
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        transition: .3s;
        .row {
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                max-width: 165px;
                overflow: hidden;
                white-space: nowrap;
            }
            &.unwrapped p {
                max-width: calc(100% - 65px);
            }
        }
        .column {
            min-width: 200px;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            small {
                font-size: 12px;
                color: $dark-grey;
                max-width: 150px;
                white-space: nowrap;
                overflow: hidden;
            }
            .row {
                width: 100%;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .unread_messages {
                    font-size: 14px;
                    background-color: $secondary-color;
                    color: $white-color;
                    height: 22.5px;
                    min-width: 25px;
                    padding: 0 2.5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                }
            }
            &.unwrapped {
                width: calc(100% - 50px);
                small, p {
                    max-width: calc(100% - 65px);
                }                
            }
        }
        
        .image_wrapper  {
            width: 45px;
            height: 45px;
            position: relative;
            .image {
                background-color: $grey-color;
                overflow: hidden;
                border-radius: 50%;
                width: 100%;
                height: 100%;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
            .auth_status {
                bottom: 0;
                right: 0;
                position: absolute;
                border: 2px solid $white-color;
                //z-index: 10;
                height: 12px;
                width: 12px;
                background-color: $grey-color;
                border-radius: 50%;
                &.online {
                    background-color: $accept-color;
                }
            }
        }
        &:hover {
            background-color: rgba($grey-color, .3);
        }
    }
</style>