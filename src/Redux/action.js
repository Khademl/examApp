import {ANSWER_DATA, CLEAR_DATA} from './type';

/* Update Question Answer List */

export const updateQuestionAnswerList = (params) => {
  return (dispatch) => {
    dispatch({
      type: `${ANSWER_DATA}`,
      payload: params,
    });
  };
};

/* Clear Answer List */

export const clearAnswerList = (params) => {
  return (dispatch) => {
    dispatch({
      type: `${CLEAR_DATA}`,
    });
  };
};
