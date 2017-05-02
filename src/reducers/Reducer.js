import { List } from 'immutable';

import { ADD_STRING, DEL_STRING, ADD_COMPONENT, DEL_COMPONENT } from './ReducerTypes';

let storage = JSON.parse(localStorage.getItem('list'));
if (storage) {
  storage = storage.map(item => List(item));
  storage = List(storage);
}
const init = storage || List([]);

export default function (state = init, action) {
  let listMsg;
  switch (action.type) {
    case ADD_COMPONENT:
      return state.push(List([]));

    case DEL_COMPONENT:
      return state.pop();

    case ADD_STRING:
      listMsg = state.get(action.payload.num).push(action.payload.text);
      return state.set(action.payload.num, listMsg);

    case DEL_STRING:
      listMsg = state.get(action.payload.num).remove(action.payload.strNum);
      return state.set(action.payload.num, listMsg);

    default: {
      return state;
    }
  }
}
