export var searchTodoReducer = (state = '', action) => {
	switch(action.type) {
		case 'CHANGE_SEARCH_TODO':
			return action.searchTodo;
		default:
			return state;
	}	
};

export var showCompletedReducer = (state = false, action) => {
	switch(action.type) {
		case 'CHANGE_STATUS': 
			return action.showCompleted;
		default:
			return state;
	}
};

export var nextTodoId = 1;
export var todosReducer = (state = [], action) => {
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

export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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