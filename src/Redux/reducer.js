/* eslint-disable no-extra-boolean-cast */
import {ANSWER_DATA, CLEAR_DATA} from './type';

const initialState = {answeredData: []};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ANSWER_DATA}`:
      return {
        ...state,
        answeredData: [action.payload.data, ...state.answeredData],
      };
    case `${CLEAR_DATA}`:
      return {...initialState, answeredData: []};
    default:
      return state;
  }
};
