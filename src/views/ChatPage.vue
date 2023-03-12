<template>
  <base-dialog
  v-if="showDialog"
  @closeDialog="showDialog=false"
  >
    <div class="chat_options_wrapper">
      <h3>Переписка с {{ this.$store.state.chat.currContactName }}</h3>
      <div class="chat_options">
        <base-button class="danger" @click="removeChat">Убрать переписку</base-button>
      </div>
    </div>
  </base-dialog>
  <div class="chat_wrapper">
    <div class="chat_handler" v-if="loading">
      <base-loader></base-loader>
    </div>
    <div class="chat_content" v-else>
      <header>
        <base-navbar @openOptions="showDialog = true"></base-navbar>
      </header>
      <message-list :messages = "messages"/>
      <footer>
        <base-input
          class="chat_input"
          @keyup.enter="sendMessage"
          v-model = 'text'
          :placehldr="'Введите сообщение'"
        />
        <div class="send_button" @click="sendMessage">
          <i class="fa-solid fa-paper-plane"></i>
        </div>
      </footer>
    </div>
  </div> 
</template>

<script>
import { onSnapshot, query, orderBy, collection,
        updateDoc, doc, serverTimestamp } from '@firebase/firestore';
import { store } from '@/firebase/config'

import BaseNavbar from '@/components/Main/BaseNavbar.vue'
import MessageList from '@/components/MessageList.vue';
export default {
  data() {
    return {
      loading: true,
      text: '',
      messages: [],
      showDialog: false,
      unsubFunc: null
    }
  },
  async mounted(){
    this.loading = true
    const info = await this.$store.dispatch('getUserInfo', this.$route.params.id)
    const name = info.name,
    photo = info.photoUrl
    

    this.$store.commit('setCurrChat', this.$route.params.id)
    this.$store.commit('setCurrContactName', name)
    this.$store.commit('setCurrContactPhoto', photo)

    this.dropUnreadMessages(this.$route.params.id)
    this.setMessagesListener()
  },
  unmounted() {
    this.unsubFunc()
  },
  methods: {
      async setMessagesListener(){
        this.loading = true

        const uid = this.$store.state.auth.userInfo.uid,
              cuid = this.$store.state.chat.currChat,
              collectionRef = collection(store, `users/${uid}/chats/${cuid}/messages`),
              q = await query(collectionRef, orderBy('createdAt'))

        let res = []
        this.unsubFunc = onSnapshot(q, async s => {
            if(cuid !== this.$route.params.id) return
            res = []
            s.forEach(el => {
                const data = el.data(),
                temp = {
                ...data, date: data.date.toDate(),
                sendedBy: data.sendedBy, type: data.sendedBy === uid ? "outcoming" : "incoming",
                photoUrl: data.sendedBy === uid 
                ? this.$store.state.auth.userInfo.photoUrl
                : this.$store.state.chat.currContactPhoto
            }
            setTimeout(()=>{
                if(temp.type === 'incoming' && temp.status == 'sended'){
                    this.updateMessageStatus(uid, cuid, el.id)
                }
            }, 0)
            res.push(temp)
            })
            this.messages = res
            await this.dropUnreadMessages(cuid)
            this.loading = false
        })
    },        
    async updateMessageStatus(from, to, messageId){
      const messageRefFrom = doc(store, `users/${to}/chats/${from}/messages`, `${messageId}`)
      
      await updateDoc(messageRefFrom, {status: 'checked'})
    },
    async sendMessage(){
      if(!this.text) return
      const uid = this.$store.state.auth.userInfo.uid,
            name = this.$store.state.auth.userInfo.name,
            newMessage = {
              text: this.text, date: new Date(),
              createdAt: serverTimestamp(),
              status: 'sending', sendedBy: uid,
              name: name, type: 'outcoming',
              photoUrl: this.$store.state.auth.userInfo.photoUrl
                ? this.$store.state.auth.userInfo.photoUrl
                : "", messageId: Math.random()

            }
      this.text = ''
      this.messages.push(newMessage)
      await this.$store.dispatch('sendMessage', {messageObject: newMessage,
        to: this.$route.params.id, hostName: this.$store.state.chat.currContactName })  
    },
    async dropUnreadMessages(cuid){
      try {
        await this.$store.dispatch('dropUnreadMessages', cuid)
      }
      catch(e) {
        console.log(e)
      } 
    },
    async removeChat() {
      await this.$store.dispatch('removeChat')
      this.showDialog = false
      this.$router.push('/')
    }
  },
  watch: {
      async $route(){
        await this.setMessagesListener()
      },
      async messages() {
        await this.dropUnreadMessages(this.$route.params.id)
      }
  },
  components: {
    BaseNavbar, MessageList
  }
}
</script>

<style lang="scss">
  .chat_wrapper {
    height: 100vh;
    display: flex;
    .chat_content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      footer {
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .chat_input {
          height: 100%;
          flex: 1;
          border-bottom: none;
          &::placeholder {
            position: absolute;
            top: 5px;
            left: 5px;
          }
        }
        .send_button {
          height: 100%;
          width: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: .3s;
          &:hover {
            i {
              transform: scale(1.1);
              background-color: transparent;
              color: $accent-color;
            }
          }
          i {
            transition: .3s;
            color: $grey-color;
            font-size: 26.5px;
          }
        }
      }
    }
    .chat_handler {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
  .chat_options_wrapper {
    width: 300px;
    h3 {
      padding-bottom: 12.5px;
      max-width: calc(100% - 40px);
      overflow: hidden;
    }
    .chat_options {
      display: flex;
      flex-flow: column nowrap;
      gap: 10px;
    }
  }
</style>