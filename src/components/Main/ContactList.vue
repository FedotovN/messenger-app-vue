<template>
    <div class="contact_list_handler" v-if="loading">
        <base-loader class="medium"></base-loader>
    </div>
    <main v-else>
        <div class="user_contacts" v-if="contacts.length">
            <small v-if="contacts.length">Ваши переписки</small>
            <base-contact
            class="contact"
            v-for="contact in sortedContacts"
            :key = "contact.uid"
            :contact = "contact"
            />
        </div>
        <div class="search_handler" v-else>
            <small>Переписок пока нет!</small>
        </div>
        <div class="user_search" v-if="searchedUsers.length && search.length">
            <small v-if="contacts.length">Найденные пользователи</small>
            <base-contact
            class="contact"
            v-for="contact in searchedUsers"
            :key = "contact.uid"
            :contact = "contact"
            />
        </div>
        <div class="search_handler" v-else-if="search.length && !searchedUsers.length && !contacts.length">
            <small>Пользователей не найдено!</small>
        </div>        
    </main>

</template>

<script>
import BaseContact from '../UI/BaseContact.vue'
import { store } from "@/firebase/config"
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
export default {
    data() {
        return {
            contacts: [],
            searchedUsers: [],
            loading: true,
            searchingForUsers: false,
            unsub: null
        }
    },
    props: ['search'],
    async mounted(){
        this.loading = true
        this.setChatsListener()
    },
    components: {
        BaseContact
    },
    watch: {
        async search(newVal){
            if(newVal.length){
                this.searchedUsers = await this.$store.dispatch('fetchUsers', newVal)
            }
            else {
                this.searchedUsers = []
            }
        }
    },
    methods: {
        async setChatsListener(){
            const uid = this.$store.state.auth.userInfo.uid,
            userChats = collection(store, `users/${uid}/chats`),
            q = query(userChats, orderBy('lastMessage.createdAt', 'desc'))
            this.unsub = onSnapshot(q, async s => {
                const chatList = s.docs
                let res = []
                for(let i in chatList) {
                    const chatInfo = chatList[i].data()
                    chatInfo.lastMessage.createdAt = chatInfo.lastMessage.createdAt?.toDate() 
                    const temp = {
                        name: chatInfo.hostName,
                        uid: chatInfo.hostUid,
                        lastMessage: chatInfo.lastMessage,
                        unreadMessages: chatInfo.unreadMessages
                    }
                    res.push(temp) 
                }
                this.contacts = res
                this.loading = false
            })
        }
    },
    computed: {
        sortedContacts() {
            return this.contacts.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    unmounted(){
        this.unsub()
    }
}
</script>

<style lang="scss" scoped>
    main, .contact_list_handler {
        flex: 1;  
        overflow-y: scroll;
        max-height: calc(100vh - 135px);
        display: flex;
        flex-flow: column nowrap;
        &::-webkit-scrollbar{
            width: 0;
        }
        .user_contacts, .user_search {
            small {
                display: block;
                padding: 10px;
            }
        }       
    }
    .contacts_handler, .search_handler{
        text-align: center;
        padding-top: 50px;
        small {
            color: $grey-color;
        }
    }
    .contact_list_handler {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
</style>