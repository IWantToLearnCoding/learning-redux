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

console.log('Starting Redux First App');

var defaultState = {
	searchTodo: '',
	showCompleted: false,
	todos: []
};

//Reducer takes state and action, combines them and return new state (completely different object)
var reducer = (state = defaultState, action) => {
	
	switch(action.type) {
		case 'CHANGE_SEARCH_TODO':
			return {
				...state,
				searchTodo: action.searchTodo
			};
		default:
			return state;
	}
};

var store = redux.createStore(reducer, redux.compose(
	//this function is a sort of configuration with which it is possible to use redux devtools with chrome dev tools. Just copy paste this.
	//This actually tell which store shall be use with Redux devTools
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes. subscribe method takes only one argument which is a cb that is executed whenever the state changes
//call to subscribe returns a function that can be called to unsubscribe from state changes.

var unsuscribeStore = store.subscribe(() => {
	var state = store.getState();
	//console.log('State searchTodo: ' + state.searchTodo);
	document.getElementById('app').innerHTML = state.searchTodo;
});

//following is for unsubscribing...
//unsubscribe();

var action = {
	type: 'CHANGE_SEARCH_TODO',
	searchTodo: 'new'
};
store.dispatch(action);
var action = {
	type: 'CHANGE_SEARCH_TODO',
	searchTodo: 'dog'
};
store.dispatch(action);
var action = {
	type: 'CHANGE_SEARCH_TODO',
	searchTodo: 'wow'
};

store.dispatch(action);
