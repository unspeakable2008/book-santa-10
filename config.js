import firebase from "firebase"
require("@firebase/firestore")
var firebaseConfig = {
    apiKey: "AIzaSyAYjYb4AdlTUcTmyUKGsBljGVdcVW_DxXs",
    authDomain: "booksanta-72883.firebaseapp.com",
    projectId: "booksanta-72883",
    storageBucket: "booksanta-72883.appspot.com",
    messagingSenderId: "747159704598",
    appId: "1:747159704598:web:e8f879ee5bf82fbd7e9137"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()