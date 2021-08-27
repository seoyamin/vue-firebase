import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyAlIqPqC1JFWcf8stKbE_jHub3k07Wa8Fc",
  authDomain: "vue-firebase-ex-a2d46.firebaseapp.com",
  projectId: "vue-firebase-ex-a2d46",
  storageBucket: "vue-firebase-ex-a2d46.appspot.com",
  messagingSenderId: "500178866928",
  appId: "1:500178866928:web:a86e44f997617c808d2835",
  measurementId: "G-9JWZRN33YS"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
