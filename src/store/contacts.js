 import { collection, getDocs } from 'firebase/firestore'
import { store } from "@/firebase/config"
export const contacts = {
    state: () => ({
        contacts: []
    }),
    mutations: {
        setContactList: (s, p) => s.contacts = p
    },
    getters: {

    },
    actions: {
        async fetchUsers({dispatch}, value){
            const uid = await dispatch('getUid'),
            reference = collection(store, 'users'),
            userList = (await getDocs(reference)).docs
            let res = []
            for(let key in userList){
                try {
                    const user = userList[key].data().info 
                    if(user.name.toLowerCase().includes(value.toLowerCase()) && user.uid !== uid) {
                        const userInfo = {
                            name: user.name,
                            uid: user.uid,
                            photoUrl: user.photoUrl
                        }
                        res.push(userInfo)
                    }
                }
                catch(e) {
                    console.error(e)
                }
            }
            return res
        }
    }
}