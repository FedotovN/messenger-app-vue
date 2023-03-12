import { signInWithEmailAndPassword,
         createUserWithEmailAndPassword } from 'firebase/auth'


import { ref, getDownloadURL } from 'firebase/storage'
import { auth, store, storage } from '@/firebase/config'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
export const authModule = {
    state: {
        userInfo: ''
    },
    getters: {
        getUserInfo: s => s.userInfo
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload
        },
        setUserName(state, payload) {
            state.userInfo.name = payload
        }
    },
    actions: {
        async signUp({dispatch}, {email, password, name}){
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid'),
                reference = doc(store, `users/${uid}`),
                reg_date = (new Date()).toString()
                setDoc(reference, {info: {
                    email,
                    password, name,
                    reg_date, uid,
                    photoUrl: '',
                    status: 'offline'
                }})
            }
            catch(e) {
                console.log(e)
                throw(e)
            }
        },
        async setUserPhoto({dispatch}) {
            try {
                const uid = await dispatch('getUid'),
                storageRef = ref(storage, `usersPhotos/${uid}`),
                url = await getDownloadURL(storageRef),
                reference = doc(store, `users/${uid}`)
                updateDoc(reference, {[`info.photoUrl`]: url})
            }
            catch(e) {
                console.log(e)
            }
        },
        async signIn({dispatch, commit}, {email, password}){
            await signInWithEmailAndPassword(auth, email, password)
            const userInfo = await dispatch('getCurrentUserInfo'),
                  uid = await dispatch('getUid')
            await updateDoc(doc(store, `users/${uid}`), {['info.status']: 'online'})
            commit('setUserInfo', userInfo)
        },
        async logOut({commit, dispatch}) {
            const uid = await dispatch('getUid')
            await updateDoc(doc(store, `users/${uid}`), {['info.status']: 'offline'})  
            await auth.signOut()
            commit('setUserInfo', null)
        },
        async checkForAuth({commit, dispatch}){
            const user = auth.currentUser
            if(user) {
                const userInfo = await dispatch('getCurrentUserInfo')
                commit('setUserInfo', userInfo)
            }
            else commit('setUserInfo', null)
        },
        async getCurrentUserInfo({dispatch}){
            const uid = await dispatch('getUid'),
            reference = doc(store, `users/${uid}`),
            info = (await getDoc(reference)).data().info
            return info
        },
        async getUserInfo(_, uid){
            const reference = doc(store, `users/${uid}`),
                  info = (await getDoc(reference)).data().info
            return {name: info.name, uid: info.uid, status: info.status, photoUrl: info.photoUrl}
        },
        async setUserName({dispatch, commit}, newName){
            const uid = await dispatch('getUid'),
            reference = doc(store, `users/${uid}`)
            commit('setUserName', newName)
            await updateDoc(reference, {['info.name']: newName})
        },
        getUid(){
            const user = auth.currentUser
            return user != null
            ? auth.currentUser.uid 
            : null
        },
    }
}