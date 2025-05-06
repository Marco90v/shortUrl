import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// import { toaster } from "@/components/ui/toaster";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const createUser = async (email:string, password:string):Promise<{code:string, message:string}> => {
  return await createUserWithEmailAndPassword(auth, email, password).then(()=>{
    return {code:"Create", message:"User created"};
  }).catch((error) => { 
    return {code:"Error", message:error.message};
  });
}

export const signIn = async (email:string, password:string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
}

export const sign_Out = async () => {
  await signOut(auth);
}

export const getUser = async () => {
  const user = auth.currentUser;
  return user;
}