import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};


// const firebaseConfigtesting = {
//     apiKey: "AIzaSyCyLsO1higc9INg2dYXOWB1zoQwr8MspcM",
//     authDomain: "db-testing-desarrollo.firebaseapp.com",
//     databaseURL: "https://db-testing-desarrollo.firebaseio.com",
//     projectId: "db-testing-desarrollo",
//     storageBucket: "db-testing-desarrollo.appspot.com",
//     messagingSenderId: "255700636691",
//     appId: "1:255700636691:web:5671574760a8a63597dbe6"
// };
// if (process.env.NODE_ENV === 'test') {
// testing
// firebase.initializeApp(firebaseConfigtesting);
// } else {
// dev/prod
firebase.initializeApp(firebaseConfig);
// }



const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}