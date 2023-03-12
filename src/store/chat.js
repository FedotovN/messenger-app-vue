import { store } from '@/firebase/config'
import { setDoc, doc, getDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore'
export const chat = {
    state: () => ({
        currChat: '',
        currContactName: '',
        currContactPhoto: '',

    }),
    getters: {
        getCurrChat: s => s.currChat
    },
    mutations: {
        setCurrChat(state, payload) {
            state.currChat = payload
        },
        setCurrContactName(state, payload){
            state.currContactName = payload
        },
        setCurrContactPhoto(state, payload){
            state.currContactPhoto = payload
        }
    },
    actions: {
        async sendMessage({dispatch, getters}, {messageObject, to, hostName}){
            const uid = await dispatch('getUid')
            let messageDocRef = doc(store, `users/${uid}/chats/${to}/messages/${messageObject.messageId}`)
            messageObject.status = 'sended'
            await setDoc(messageDocRef , messageObject)
            await dispatch('saveChat', {message: messageObject, from: messageObject.sendedBy, to,
                            hostName})


            messageDocRef = doc(store, `users/${to}/chats/${uid}/messages/${messageObject.messageId}`)
            await setDoc(messageDocRef, messageObject)
            await dispatch('saveChat', {message: messageObject, from: to, to: messageObject.sendedBy,
                            hostName: getters.getUserInfo.name})
        },
        async saveChat({dispatch}, {message, from, to, hostName}){
            const uid = await dispatch('getUid'),
                  reference = doc(store, `users/${from}/chats/${to}`),
                  data = (await getDoc(reference)).data()
            if(!data) {
                await setDoc(reference, {hostName, lastMessage: message, hostUid: to})
            }
            else {
                await updateDoc(reference, {hostName, lastMessage: message, hostUid: to})
            }

            if(from != uid) {
                await updateDoc(reference, {unreadMessages: increment(1)})
            }
        },
        async dropUnreadMessages({dispatch}, cuid) {
            const uid = await dispatch('getUid'),
            docRef = doc(store, `users/${uid}/chats/${cuid}`)
            await updateDoc(docRef, {unreadMessages: 0})
        },
        async deleteMessage({dispatch, getters}, messageId) {
            const uid = await dispatch('getUid'),
            cuid = getters.getCurrChat
            let reference = doc(store, `users/${uid}/chats/${cuid}/messages/${messageId}`)
            await deleteDoc(reference)

            reference = doc(store, `users/${cuid}/chats/${uid}/messages/${messageId}`)
            await deleteDoc(reference)
        },
        async updateMessage({dispatch, getters}, { messageId, newText }) {
            const uid = await dispatch('getUid'),
            cuid = getters.getCurrChat
            let reference = doc(store, `users/${uid}/chats/${cuid}/messages/${messageId}`)
            updateDoc(reference, {text: newText})

            reference = doc(store, `users/${cuid}/chats/${uid}/messages/${messageId}`)
            updateDoc(reference, {text: newText})
        },
        async removeChat({dispatch, getters}) {
            const uid = await dispatch('getUid'),
            cuid = getters.getCurrChat
            let reference = doc(store, `users/${uid}/chats/${cuid}`)

            deleteDoc(reference)
        }
    }
}