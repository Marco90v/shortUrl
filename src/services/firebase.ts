import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { LinkItem } from "@/type";

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

export const signIn = async (email:string, password:string):Promise<{code:string, message:string, user:User | null}> => {
  // const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // return userCredential;
  return await signInWithEmailAndPassword(auth, email, password).then((userCredential:UserCredential)=>{
    return {code:"Started", message:"Session started", user:userCredential.user};
  }).catch((error) => { 
    return {code:"Error", message:error.message, user:null};
  });
}

export const sign_Out = async () => {
  await signOut(auth);
}

// export const getUser = async () => {
//   const user = auth.currentUser;
//   return user;
// }

export const addLinkFirebase = async (email:string, link:LinkItem):Promise<{code:string, message:string}> => {
  const domain = window.location.hostname;
  return await setDoc(doc(db, email, link.id), link).then(() => {
    return {code:"Link shortened successfully!", message:`Your new short URL: ${domain}/${link.shortUrl}`};
  }).catch((error) => {
    console.error("Error adding document: ", error);
    return {code:"Error", message:error.message};
  });
}

export const getData = async (email:string | null):Promise<{code:string, message:string, links:LinkItem[]}> => {
  if(!email) return {code:"Error", message:"No user found", links:[]};
  const links = await getDocs(query(collection(db, email)));
  return {code:"Success", message:"Data retrieved successfully", links:links.docs.map((doc:any)=>doc.data())};
}

// export const deleteLink = async (email:string, id:string):Promise<{code:string, message:string}> => {
//   return await deleteDoc(doc(db, email, id)).then(() => {
//     return {code:"Link deleted successfully!", message:"Your link has been deleted."};
//   }).catch((error) => {
//     console.error("Error deleting document: ", error);
//     return {code:"Error", message:error.message};
//   });
// }