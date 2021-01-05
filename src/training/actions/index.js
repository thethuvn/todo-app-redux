import * as types from './../constants/ActionTypes';

export const statusAction = () => {
	return {
		type: types.TOGGLE_STATUS
	}
}

export const sortAction = (sort) => {
	return {
		type: types.SORT,
		sort //sort:sort
	}
}