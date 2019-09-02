import firebase from 'firebase';


var firebaseConfig = {
    
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const firedb = firebase.firestore()

export default firedb;