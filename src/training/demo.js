import { createStore } from 'redux';
import { statusAction, sortAction } from './actions/index'
import myReducer from './reducers/index';


const store = createStore(myReducer);

//var action = {type: 'TOGGLE_STATUS'};
console.log(store.getState())
store.dispatch(statusAction());
console.log(store.getState())
store.dispatch(sortAction({by:'name', value:'-1'}));
console.log(store.getState())
store.dispatch(sortAction({by:'name', value:'1'}));
console.log(store.getState())