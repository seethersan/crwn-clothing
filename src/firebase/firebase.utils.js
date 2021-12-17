import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCeqBeYQ5imOHabi5UfQwh5V7HI-OuNTws",
    authDomain: "crwn-db-9416d.firebaseapp.com",
    projectId: "crwn-db-9416d",
    storageBucket: "crwn-db-9416d.appspot.com",
    messagingSenderId: "1006361172148",
    appId: "1:1006361172148:web:571d36eb6e2cb064cb9fe1",
    measurementId: "G-77ZGJ0NHLZ"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const snapShot = await userRef.get();

      if (!snapShot.exist) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              });
          }   catch (error) {
              console.log('error creating user', error.message);
          }      
      }

      return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;