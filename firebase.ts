// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWP7CV6OwhkJjL5ig3wFLmx-mxk5PErZ0",
    authDomain: "netflix-2-a1ff9.firebaseapp.com",
    projectId: "netflix-2-a1ff9",
    storageBucket: "netflix-2-a1ff9.appspot.com",
    messagingSenderId: "459827864209",
    appId: "1:459827864209:web:3b3495e225e07f70365530"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }