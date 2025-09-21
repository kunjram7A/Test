// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4852593021-4760b",
  "appId": "1:665251912638:web:154067ccd21a271952b7ef",
  "storageBucket": "studio-4852593021-4760b.appspot.com",
  "apiKey": "AIzaSyCFjm6FtBGW_orF-WsUvlsH8ivE4-LH_QM",
  "authDomain": "studio-4852593021-4760b.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "665251912638"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
