//test reducer, global store

import { IAppState } from './state';
import * as actionTypes from './actions';
const initialState: IAppState = {
  currentUser: {},
  requestList: [],
  providerList: [],
  comments: [],
};

export function reducer(state: IAppState = initialState, action: any) {
  switch (action.type) {
    // case actionTypes.LOGIN:
    //   return state;
    // case actionTypes.SIGNUP:
    //   return state;
    case actionTypes.GET_REQUEST_LIST:
      return { ...state, requestList: action.payload };
    case actionTypes.GET_PROVIDER_LIST:
      return { ...state, providerList: action.payload };
    case actionTypes.EDIT_USER:
      return { ...state, currentUSer: action.payload };
    case actionTypes.GET_POST_DETAIL:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
}
