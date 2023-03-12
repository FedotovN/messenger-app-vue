import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBgAobkrVC1V8VGtAvE4Q9PBOo-hMROL4s",
  authDomain: "messenger-app-vue.firebaseapp.com",
  projectId: "messenger-app-vue",
  storageBucket: "messenger-app-vue.appspot.com",
  messagingSenderId: "368340788953",
  appId: "1:368340788953:web:fc11dcc605effa6767c0c8"
};


const app = initializeApp(firebaseConfig),
      database = getDatabase(app),
      auth = getAuth(app),
      store = getFirestore(app),
      storage = getStorage(app)
      
export { database, auth, store, storage }