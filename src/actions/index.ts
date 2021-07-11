import {
	createNewListForUser,
	createNewTodoDb,
	deleteListDb,
	deleteTodoDb,
	fetchUserDataFromDb,
	getListTodos,
	getUsersLists,
	loginUser,
	updateTodoDb,
} from '../tools/firebase';
import { createNewUserDb } from '../tools/firebase';
import { ListObj, State, TodoObjUpdate, TodoObj } from '../types';

// Users

export const attemptLogin = (email: string, password: string) => async (dispatch: any) => {
	//call on firebase here.

	const uid = await loginUser(email, password);

	if (uid) {
		console.log(`Action creator received: ${uid}`);
		dispatch(setUserDataFromId(uid));
		dispatch(setUserLists(uid));
	} else {
		console.log('ERROR - user not defined or null in action creator');
	}
};

export const createNewUser =
	(email: string, password: string, name: string) => async (dispatch: any) => {
		//create new user at firebase
		const userData = await createNewUserDb(email, password, name);

		dispatch({ type: 'SET_USER_DATA', payload: userData });
		dispatch(setUserLists(userData.uid));
	};

export const setUserDataFromId = (uid: string) => async (dispatch: any) => {
	//do firbase thing
	console.log('Attempting featch data from action creator');
	const response = await fetchUserDataFromDb(uid);

	if (response) {
		console.log(response);
		dispatch({ type: 'SET_USER_DATA', payload: response });
	} else {
		console.log('ERROR - no data returned to action creator');
	}
};

//-------------------------------------------------------------------------------------------------------
//Lists

export const setUserLists =
	(uid: string, setIndex: boolean = true) =>
	async (dispatch: any) => {
		const lists = await getUsersLists(uid);

		dispatch({ type: 'SET_USER_LISTS', payload: lists });

		if (setIndex && lists && lists[0] && lists[0].listId) {
			dispatch(setActiveList(lists[0].listId));
		}
	};

export const createNewList = (uid: string, listName: string) => async (dispatch: any) => {
	const data: ListObj = {
		userId: uid,
		listName,
	};

	const retData = await createNewListForUser(data);
	console.log(retData);

	dispatch(setUserLists(uid, false));

	if (retData.listId) dispatch(setActiveList(retData.listId));
};

export const setActiveList = (listId: string) => async (dispatch: any) => {
	dispatch({ type: 'SET_ACTIVE_LIST', payload: listId });
	dispatch(setActiveListTodos());
};

export const deleteList =
	(listId: string | undefined) => async (dispatch: any, getState: () => State) => {
		if (!listId) return;

		await deleteListDb(listId);
		dispatch(setUserLists(getState().user.uid));
	};

//-------------------------------------------------------------------------------------------------------
// Todos

export const createNewTodo =
	(listId: string, todoName: string, todoDescription: string) => async (dispatch: any) => {
		console.log('action ran');
		const data: TodoObj = {
			complete: false,
			description: todoDescription,
			list: listId,
			title: todoName,
		};

		const retData = await createNewTodoDb(data);
		console.log(retData);

		dispatch(setActiveListTodos());
	};

export const setActiveListTodos = () => async (dispatch: any, getState: any) => {
	dispatch({ type: 'SET_ACTIVE_LIST_TODOS', payload: [] });
	if (getState().activeListId) {
		const todos = await getListTodos(getState().activeListId);
		dispatch({ type: 'SET_ACTIVE_LIST_TODOS', payload: todos });
	}
};

export const updateTodo =
	(todoId: string, changes: TodoObjUpdate) => async (dispatch: any, getState: () => State) => {
		updateTodoDb(todoId, changes);

		const todos: TodoObj[] = [...getState().todos];
		console.log(todos);
		let targetIndex = todos.findIndex((value) => value.todoId === todoId);

		todos[targetIndex] = { ...todos[targetIndex], ...changes };

		dispatch({ type: 'SET_ACTIVE_LIST_TODOS', payload: todos });
	};

export const deleteTodo = (todoId: string | undefined) => async (dispatch: any) => {
	if (!todoId) return;

	await deleteTodoDb(todoId);
	dispatch(setActiveListTodos());
};
