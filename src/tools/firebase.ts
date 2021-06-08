import {DocumentData, getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { UserObj } from '../types';

export const firebaseConfig = {
    apiKey: "AIzaSyBS8rvb4pFIz_0o1oMEgJ0y8UBWEzpQLXw",
    authDomain: "todo-v3.firebaseapp.com",
    projectId: "todo-v3",
    storageBucket: "todo-v3.appspot.com",
    messagingSenderId: "740783737654",
    appId: "1:740783737654:web:d1d002529067a626b30197",
    measurementId: "G-G4D7JQ4VX7"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

export const fetchUserDataFromDb = async (uid: string): Promise<DocumentData | null> => {
    const docRef = doc(db, 'users', uid);
    console.log(`Fetching data from tools - id: ${uid}`);

    const docSnap = await getDoc(docRef);

    console.log('Done fetching data from tools');

    if(docSnap?.exists()){
        return docSnap.data();
    }else{
        console.log('No Such Document');
        return null;
    }
}

export const loginUser = async (email: string, password: string): Promise<string | null> => {
    
    const response = await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            let user = userCredential.user;

            console.log(user);

            if(user)
                return user.uid;
            else{
                console.log('ERROR - login didnt return user');
                return null;
            }
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(errorCode, errorMessage);
            return null;
        });

    console.log('Login complete');
    return response;
}

export const createNewUserDb = async (email: string, password: string, name: string) => {
    const uid = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return user.uid;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    const uidStr = uid as string;
    const data: UserObj = { name, uid: uidStr};

    await setDoc(doc(db, 'users', uidStr ), data);

    return data;
}

export const getUsersLists = async (userId: string) => {
    const listsRef = collection(db, 'lists');
    const q = query(listsRef, where("userId", '==', userId));

    const responseList: any[] = [];
    const querySnapshot = await getDocs(q);


    querySnapshot.forEach(doc => {
        responseList.push(doc.data());
    });

    console.log(responseList);

    return responseList;
}