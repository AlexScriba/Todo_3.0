import { fetchUserDataFromDb, getUsersLists, loginUser } from '../tools/firebase';
import { UserObj } from '../types';
import { createNewUserDb } from '../tools/firebase';

export const attemptLogin = (email: string, password: string) => async (dispatch: any) => {
    //call on firebase here.

    const uid = await loginUser(email, password);

    if(uid){
        console.log(`Action creator received: ${uid}`);
        dispatch(setUserDataFromId(uid));
        dispatch(setUserLists(uid));
    }else{
        console.log('ERROR - user not defined or null in action creator');
    }
}

export const createNewUser = (email: string, password: string, name: string) => async (dispatch: any) => {
    //create new user at firebase
    const userData = await createNewUserDb(email, password, name);
    
    dispatch({type: 'SET_USER_DATA', payload: userData});
    dispatch(setUserLists(userData.uid));
}

export const setUserDataFromId = (uid: string) => async (dispatch: any) => {
    //do firbase thing
    console.log('Attempting featch data from action creator');
    const response = await fetchUserDataFromDb(uid);

    if(response){
        console.log(response); 
        dispatch({type: 'SET_USER_DATA', payload: response});
    } else {
        console.log('ERROR - no data returned to action creator');
    }
}

export const setUserLists = (uid: string) => async (dispatch: any) => {
    const lists = await getUsersLists(uid);

    dispatch({type: 'SET_USER_LISTS', payload: lists});
}
