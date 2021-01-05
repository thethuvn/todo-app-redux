var initialState = {
	status : false,
}
var myReducer = (state = initialState, action) => {
	if (action.type === 'TOGGLE_STATUS') {
		return {status:!state.status};
	}
	return state;
}
export default myReducer;