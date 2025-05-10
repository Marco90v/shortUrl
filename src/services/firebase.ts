import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, DocumentData, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updatePassword, User, UserCredential } from "firebase/auth";
import { LinkItem } from "@/type";

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
  return await signInWithEmailAndPassword(auth, email, password).then((userCredential:UserCredential)=>{
    return {code:"Started", message:"Session started", user:userCredential.user};
  }).catch((error) => { 
    return {code:"Error", message:error.message, user:null};
  });
}

export const sign_Out = async () => {
  await signOut(auth);
}

export const addLinkFirebase = async (link:LinkItem):Promise<{code:string, message:string}> => {
  const domain = window.location.hostname;
  if(!link) return {code:"Error", message:"No link found"};
  return await setDoc(doc(db, "links", link.shortUrl), link).then(() => {
    return {code:"Link shortened successfully!", message:`Your new short URL: ${domain}/${link.shortUrl}`};
  }).catch((error) => {
    console.error("Error adding document: ", error);
    return {code:"Error", message:error.message};
  });
}

export const getLinks = async (email:string | null):Promise<{code:string, message:string, links:LinkItem[]}> => {
  if(!email) return {code:"Error", message:"No user found", links:[]};
  const links = await getDocs(query(collection(db, "links"), where("email", "==", email) ));
  return {code:"Success", message:"Data retrieved successfully", links:links.docs.map((doc:QueryDocumentSnapshot<DocumentData, DocumentData>)=>doc.data()) as LinkItem[]}; 
}

export const getClicks = async (shortUrl:string):Promise<{clicks:number}> => {
  if(!shortUrl) return {clicks:0};
  const link = await getDoc(doc(db, "links", shortUrl));
  if (link.exists()) {
    return {clicks:link.data().clicks};
  }
  console.error("Error getting document");
  return {clicks:0};
}

export const deleteLink = async (email:string | null, shortUrl:string):Promise<{code:string, message:string}> => {
  if(!email) return {code:"Error", message:"No user found"};
  return await deleteDoc(doc(db, "links", shortUrl)).then(() => {
    return {code:"Link deleted successfully!", message:"Your link has been deleted."};
  }).catch((error) => {
    console.error("Error deleting document: ", error);
    return {code:"Error", message:error.message};
  });
}

export const changePassword = async (newPassword:string):Promise<{code:string, message:string}> => {
  const user = auth.currentUser;
  if(!user) return {code:"Error", message:"No user found"};
  return await updatePassword(user, newPassword).then(() => {
    return {code:"Password updated successfully!", message:"Your password has been updated."};
  }).catch((error) => {
    console.error("Error updating password: ", error);
    return {code:"Error", message:error.message};
  });
}

export const getOriginalLink = async (shortURL:string):Promise<{linkOriginal:string|null}> => {
  if(!shortURL) return {linkOriginal:null};
  const linkOriginal = await getDoc(doc(db, "links", shortURL));
  if (linkOriginal.exists()) {
    return await updateDoc(doc(db, "links", shortURL), { clicks: linkOriginal.data().clicks + 1 }).then(() => {
      return {linkOriginal:linkOriginal.data().originalUrl};
    }).catch((error) => {
      console.error("Error updating document: ", error);
      return {linkOriginal:null}
    });
  }
  console.error("Error getting document");
  return {linkOriginal:null};
}