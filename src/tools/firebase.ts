import {DocumentData, getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc, addDoc, runTransaction} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { ListObj, TodoObj, TodoObjUpdate, UserObj } from '../types';

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

    const responseList: ListObj[] = [];
    const querySnapshot = await getDocs(q);


    querySnapshot.forEach(doc => {
        const retObj = doc.data() as ListObj;
        responseList.push({listId: doc.id, userId: retObj.userId, listName: retObj.listName});
    });

    console.log(responseList);

    return responseList;
}

//create lists
export const createNewListForUser = async (data: ListObj): Promise<ListObj> => {
    const listRef = collection(db, 'lists');
    const response = await addDoc(listRef , data);
    console.log(response.id);
    return {...data, listId: response.id};
}

//delete lists

//edit lists


//fetch todos
export const getListTodos = async (listId: string) => {
    const todosRef = collection(db, 'todoItems');
    const q = query(todosRef, where('list', '==', listId));

    const responseList: TodoObj[] = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        const retObj = doc.data() as TodoObj;
        responseList.push({...retObj, todoId: doc.id});
    });

    console.log(responseList);
    return responseList;
}

//create todos
export const createNewTodoDB = async (data: TodoObj): Promise<TodoObj> => {
    const todoRef = collection(db, 'todoItems');
    const response = await addDoc(todoRef, data);
    console.log(response.id);
    return {...data, todoId: response.id};
}

//delete todos

//edit todos 
export const updateTodoDb = async (todoId: string, changes: TodoObjUpdate) => {
    const todoDocRef = doc(db, 'todoItems', todoId);

    try{
        await runTransaction(db, async (transaction) => {
            const todoDoc = await transaction.get(todoDocRef);
            if(!todoDoc.exists()){
                console.log('Error - doc doesnt exits');
            }

            transaction.update(todoDocRef, {...changes});
        });
    } catch (e) {
        console.log('Transaction failes: ', e);
    }
}