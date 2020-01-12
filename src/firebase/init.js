import firebase from 'firebase'
import { config } from 'dotenv'
import firestore from 'firebase/firestore'
import analytics from 'firebase/analytics'

config()

console.log(process.env.API_KEY)

var firebaseConfig = {
  apiKey: "AIzaSyDCsbQ75kjm4kNL6NAsXEs1vXKXDRXcKgM",
  authDomain: "udemy-ninja-smoothies-33b82.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-33b82.firebaseio.com",
  projectId: "udemy-ninja-smoothies-33b82",
  storageBucket: "udemy-ninja-smoothies-33b82.appspot.com",
  messagingSenderId: "979295634088",
  appId: "1:979295634088:web:61fab709df50ad3c17b89d",
  measurementId: "G-BBZZ45N4RD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebaseApp.firestore()
