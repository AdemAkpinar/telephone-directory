import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  groups: [],
  fail: false,
  error: "",
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.groupActions.GET_GROUPS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.groupActions.GET_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        groups: action.payload,
        fail: false,
      };
    case actionTypes.groupActions.GET_GROUPS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default groupsReducer;
