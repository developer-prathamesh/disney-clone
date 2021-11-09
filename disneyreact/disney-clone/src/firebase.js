import firebase from 'firebase'



const firebaseConfig = {
  apiKey: "AIzaSyB8T77QP7DFECRcbMZzhxP83haCUL_CQYE",
  authDomain: "disney-clone-42e13.firebaseapp.com",
  projectId: "disney-clone-42e13",
  storageBucket: "disney-clone-42e13.appspot.com",
  messagingSenderId: "123334171990",
  appId: "1:123334171990:web:2928fbdfae7acc3e7f8af7",
  measurementId: "G-PCWYVJ39CZ"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth,provider,storage};
export default db;