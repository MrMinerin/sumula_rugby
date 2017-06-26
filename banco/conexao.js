// Initialize Firebase
var config = {
  apiKey: "AIzaSyDOfI3gqj8xqYfmDtfSlJwyepNge8Vrqww",
  authDomain: "rugby-b8ee8.firebaseapp.com",
  databaseURL: "https://rugby-b8ee8.firebaseio.com",
  projectId: "rugby-b8ee8",
  storageBucket: "rugby-b8ee8.appspot.com",
  messagingSenderId: "370487944952"
};
firebase.initializeApp(config);
const app = firebase.database().ref();
const storage = firebase.storage().ref();
const auth = firebase.auth();
