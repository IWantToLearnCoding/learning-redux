/*
1. In redux functions shall be pure functions.
2. Both state and actions (that can be dispatched on state) are normal javascript objects. Watch section 10, video 104
3. Action objects have two things - 1. (mandatory) action type or action name 2. (Optional) properties that need to be updated.

Pure functions:
1. if same input is given, output shall always be the same
2. function shall not depend on any outside variable
3. There shall be no side-effects, meaning it shall not change any outside variable.
4. It shall not change anything passed to it. Special care needs to be taken when arrays and objects are passed as references.
5. Redux functions shall not have any asynchronous code (no io, no promise, no http call, no db calls)
Watch Section 10, video 106 for all the examples
*/
/*reducer function shall
1. take default state (state passed into the reducer)
2. return final state (completly different object as it is a pure function)

reducer function takes two arguments
1. default state
2. action that can be dispatched onto the state to change it.

Basic points for REDUX
1. Create a reducer that takes state and action
2. Dispatch action on the state using reducer which returns new state
3. Subscribe to state changes so that whatever component are dependent on changes can re-render themselves
*/

var redux = require('redux');
var axios = require('axios');

console.log('Starting Redux First App');

/*var defaultState = {
	searchTodo: '',
	showCompleted: false,
	todos: []
};*/

var nextTodoId = 1;

//Reducer takes state and action, combines them and return new state (completely different object)
/*var oldReducer = (state = defaultState, action) => {
	
	switch(action.type) {
		case 'CHANGE_SEARCH_TODO':
			return {
				...state,
				searchTodo: action.searchTodo
			};
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, 
					{
						id: nextTodoId++,
						todo: action.todo
					}
				]
			};
		case 'REMOVE_TODO': 
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.id)
			};
		default:
			return state;
	}
};*/
//SearchTodoReducer and aciton generators
//-------------------------------
var searchTodoReducer = (state = '', action) => {
	switch(action.type) {
		case 'CHANGE_SEARCH_TODO':
			return action.searchTodo;
		default:
			return state;
	}	
};


//showCompletedReducer and aciton generators
//-------------------------------
var showCompletedReducer = (state = false, action) => {
	switch(action.type) {
		case 'CHANGE_STATUS': 
			return action.showCompleted;
		default:
			return state;
	}
};

//todosReducer and aciton generators
//-------------------------------
var todosReducer = (state = [], action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: nextTodoId++,
					todo: action.todo
				}
			];
		case 'REMOVE_TODO': 
			return state.filter((todo) => todo.id !== action.id);
		default:
			return state;	
	}
};
var addTodo = (todo) => {
	return {
		type: 'ADD_TODO',
		todo
	};
};

var removeTodo = (id) => {
	return {
		type: 'REMOVE_TODO',
		id
	}
};

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
	switch(action.type) {
		case 'START_LOCATION_FETCH':
			return { 
					isFetching: true,
					url: undefined
				};
		case 'COMPLETE_LOCATION_FETCH': 
			return {
					isFetching: false,
					url: action.url
				};
		default:
			return state;	
	}
};

var startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	};
};

var completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

var reducer = redux.combineReducers({
	searchTodo: searchTodoReducer,
	showCompleted: showCompletedReducer,
	todos: todosReducer,
	map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
	//this function is a sort of configuration with which it is possible to use redux devtools with chrome dev tools. Just copy paste this.
	//This actually tell which store shall be use with Redux devTools
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes. subscribe method takes only one argument which is a cb that is executed whenever the state changes
//call to subscribe returns a function that can be called to unsubscribe from state changes.

var fetchLocation = () => {
	store.dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function(res) {
		var loc = res.data.loc;
		var baseUrl = 'http://maps.google.com?q=';

		store.dispatch(completeLocationFetch(baseUrl + loc));
	});
	
};


var unsuscribeStore = store.subscribe(() => {
	var state = store.getState();
	console.log(state);
	//console.log('State searchTodo: ' + state.searchTodo);
	if(state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Fetching your location...';
	} else if(state.map.url)
		document.getElementById('app').innerHTML = '<a target="_blank" href="'+state.map.url+'+">View your location</a>';
});

//following is for unsubscribing...
//unsubscribe();

var action = {
	type: 'CHANGE_SEARCH_TODO',
	searchTodo: 'new'
};

fetchLocation();

store.dispatch(action);

store.dispatch(addTodo('Walk Dog'));

store.dispatch(addTodo('Go for movies'));

store.dispatch(removeTodo(2));
