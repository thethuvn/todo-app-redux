import * as types from './../constants/ActionTypes';

var initialState = {
	by: 'name',
	value: 1
}
var myReducer = (state = initialState, action) => {
	if (action.type === types.SORT) {
		return {
			by: action.sort.by,
			value: action.sort.value
		};
	}
	return state;
}

export default myReducer;