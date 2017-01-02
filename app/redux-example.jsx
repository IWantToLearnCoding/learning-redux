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

var store = redux.createStore(reducer);

console.log('currentState', store.getState());

var action = {
	type: 'CHANGE_SEARCH_TODO',
	searchTodo: 'new'
}

store.dispatch(action);

console.log('currentState', store.getState());