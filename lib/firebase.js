import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAX4QJXVtaGA4tBHTyEJZP_Au0Tl8p0ebw",
  authDomain: "digital-soko.firebaseapp.com",
  projectId: "digital-soko",
  storageBucket: "digital-soko.appspot.com",
  messagingSenderId: "538307178491",
  appId: "1:538307178491:web:df39d0c88162a0d98fa55e",
  measurementId: "G-02RQMZX3W8",
};

function createFirebaseApp(config) {
  // Try to get an existing Firebase app instance.
  // If it does not exist, catch the error and initialize a new Firebase app.
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// Initialize Firebase
const app = createFirebaseApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
