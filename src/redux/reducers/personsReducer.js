import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  persons: [],
  fail: false,
  error: "",
};

const personsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.personActions.GET_PERSONS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.personActions.GET_PERSONS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        persons: action.payload,
      };
    case actionTypes.personActions.GET_PERSONS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.personActions.DELETE_PERSONS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.personActions.DELETE_PERSONS_SUCCESS:
      let filteredPersons = state.persons.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        persons: filteredPersons,
      };
    case actionTypes.personActions.DELETE_PERSONS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.personActions.ADD_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload],
      };
    default:
      return state;
  }
};

export default personsReducer;
