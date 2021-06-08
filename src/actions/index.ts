import { fetchUserDataFromDb, loginUser } from '../tools/firebase';

export const attemptLogin = (email: string, password: string) => async (dispatch: any) => {
    //call on firebase here.

    const uid = await loginUser(email, password);

    if(uid){
        console.log(`Action creator received: ${uid}`);
        dispatch(setUserDataFromId(uid));
    }else{
        console.log('ERROR - user not defined or null in action creator');
    }
}

export const createNewUser = (email: string, password: string) => async (dispatch: any) => {
    //create new user at firebase
    
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
