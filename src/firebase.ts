import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCivbbTwlY58uAst-24-Ui_mh9QkWrMuZw',
  authDomain: 'quizil-eed04.firebaseapp.com',
  projectId: 'quizil-eed04',
  storageBucket: 'quizil-eed04.appspot.com',
  messagingSenderId: '545222672654',
  appId: '1:545222672654:web:9d24cf22911b2dfaced75f',
  measurementId: 'G-34RTTM7SWG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new GoogleAuthProvider();
const auth = getAuth();
const storage = getStorage(app);

export { auth, provider, storage };

export default db;
