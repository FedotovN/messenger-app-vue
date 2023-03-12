<template>
  <base-dialog v-if="showDialog" @closeDialog="showDialog = false">
  <div class="message_options_wrapper">  
    <h3>Ваше сообщение</h3>
    <div class="message_options">
        <base-button class="danger" @click="deleteMessage">Удалить сообщение</base-button>
        <base-button @click="showEditModal">Редактировать сообщение</base-button>
    </div>    
  </div>
  </base-dialog>
  <main v-if="messages.length">
        <base-message
        class="message"
        v-for="message in messages"
        :key="message.timestamp"
        :message = 'message'
        @openOptions="openOptions"
        ></base-message>
    </main>
    <div class="messages_handler" v-else>
        <p>Начните общение с {{ this.$store.state.chat.currContactName }} c чего нибудь хорошего! 🤟<br> Например, банальщины: спросите - "Как у тебя дела?"</p>
    </div>
    <base-dialog v-if="showEditDialog" @keyup.enter="editMessage" @closeDialog = "showEditDialog = false">  
        <div class="edit_message_wrapper">
            <h3>Редактирование сообщения</h3>
            <base-input
            v-model="newText"
            />
            <base-button @click="editMessage">Сохранить</base-button>
        </div>
    </base-dialog>
</template>

<script>
import BaseButton from './UI/BaseButton.vue'
export default {
  components: { BaseButton },
    name: 'MessageList',
    props: ['messages'],
    data() {
        return {
            showDialog: false,
            showEditDialog: false,
            newText: '',
            chosenMessage: {}
        }
    },
    mounted() {
        this.scrollDown()
    },
    methods: {
        scrollDown(){
            setTimeout(()=>{
                const messageBlocks = document.getElementsByClassName('message'),
                    lastMessage = messageBlocks[messageBlocks.length - 1]
                lastMessage?.scrollIntoView({behavior: 'smooth'})
            }, 0)
        },
        openOptions(message) {
            this.chosenMessage = message
            this.showDialog = true
        },
        async deleteMessage() {
            await this.$store.dispatch('deleteMessage', this.chosenMessage.messageId)
            this.showDialog = false
        },
        showEditModal(){
            this.showEditDialog = true
        },
        async editMessage() {
            if(!this.newText) return
            await this.$store.dispatch('updateMessage', {messageId: this.chosenMessage.messageId,
                                                        newText: this.newText })
            this.showEditDialog = false    
            this.showDialog = false
            this.newText = ''
        }
    },
    watch: {
        messages(){
            this.scrollDown()
        }
    }
}
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
        flex: 1;
        height: calc(100% - 155px);
        width: calc(100% - 20px);
        padding: 10px;
        overflow-y: scroll;
        background-color: rgba($grey-color, .2);
        &::-webkit-scrollbar{
            width: 0;
        }
        .messages_handler {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
                p {
                    padding: 10px;
                    box-shadow: 5px 5px 10px 1px $grey-color;
                    border: 1px solid $grey-color;
                    border-radius: 8px;
                }
        }
    }
    .message_options_wrapper {
        width: 300px;
        h3 {
            padding-bottom: 12.5px;
        }   
        .message_options {
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
        }
    }
    .edit_message_wrapper {
        width: 300px;
        display: flex;
        flex-flow:  column nowrap;
        gap: 10px;
    }
</style>