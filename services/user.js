import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function createUser({ email, password }) {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw "Could not create user account";
  }
}

export async function signInUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    throw error.code.replace("auth/", "");
  }
}

export async function getAccount(uid) {
  const docRef = doc(db, "accounts", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw "Account details do not exist";
  }
}

export async function updateAccount({ uid, data }) {
  await setDoc(doc(db, "accounts", uid), data);
}

export async function signOutUser() {
  try {
    await signOut(auth);
    window.location.href = "/login";
  } catch (error) {
    throw error.code.replace("auth/", "");
  }
}
