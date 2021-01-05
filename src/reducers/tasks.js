import * as types from './../constants/ActionTypes';


var s4 = () => {
	return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}

var randomID = () => {
	return s4() + "-" + s4() + "-" + s4() + "-" + s4(); 
}

var findIndex = (tasks, id) => {
	var result = -1;
	tasks.forEach((task, index)=>{
		if (task.id === id) {
			result = index;
		}
	});
	return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.BUILD_TASKS:
			localStorage.setItem('tasks', JSON.stringify(action.tasks));
			state = action.tasks;
			return [...state];
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK: //update or insert
			var task = {
				id: action.task.id,
				name: action.task.name,
				status: (action.task.status === 'true'||action.task.status === true) ? true : false
			};
			if (!task.id) {
				task.id = randomID();
				state.push(task);
			} else {
				index = findIndex(state, task.id);
				if (index !== -1) {
					state[index] = task;
				}
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			var index = findIndex(state, action.id);
			if (index !== -1) {
				state.splice(index, 1);
				localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		case types.UPDATE_STATUS_TASK:
			var index = findIndex(state, action.id);
			if (index !== -1) {
				//state[index].status = !state[index].status; 
				// var cloneTask = {...state[index]};
				// cloneTask.status = !cloneTask.status;
				// state.splice(index, 1);
				// state.push(cloneTask);
				// state[index] = cloneTask;
				state[index] = {
					...state[index],
					status: !state[index].status
				}
				localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		default: 
			return state;
	}	
}

export default myReducer;
//state[index].status = !state[index].status; 
//issue not update status in view =>clone old item , remove old item and and new again.