var redux = require('redux');
var {searchTodoReducer, showCompletedReducer, todosReducer, mapReducer} = require('./../reducers/index');
var thunk = require('redux-thunk').default;

export var configure = () => {
	var reducer = redux.combineReducers({
		searchTodo: searchTodoReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer,
		map: mapReducer
	});

	var store = redux.createStore(reducer, redux.compose(
		redux.applyMiddleware(thunk),
		//this function is a sort of configuration with which it is possible to use redux devtools with chrome dev tools. Just copy paste this.
		//This actually tell which store shall be use with Redux devTools
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}


