import { LOADING, SAVE_RESULTS, SEARCH_VALUE, ERROR } from '../actions'

const initialState = {
  results: [],
  value: '',
  loading: true,
  error: false,
}

const searchReducer = function (currentState = initialState, action) {
  switch (action.type) {
    case SAVE_RESULTS: {
      return {
        ...currentState,
        results: action.payload,
      }
    }
    case SEARCH_VALUE: {
      return {
        ...currentState,
        value: action.payload,
      }
    }
    case LOADING: {
      return {
        ...currentState,
        loading: action.payload,
      }
    }
    case ERROR: {
      return {
        ...currentState,
        error: action.payload,
      }
    }
    default: {
      return currentState
    }
  }
}

export default searchReducer
