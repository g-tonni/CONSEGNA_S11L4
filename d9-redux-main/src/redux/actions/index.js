export const ADD_TO_FAVLIST = 'ADD_TO_FAVLIST'
export const REMOVE_FROM_FAVLIST = 'REMOVE_FROM_FAVLIST'
export const SAVE_RESULTS = 'SAVE_RESULTS'
export const SEARCH_VALUE = 'SEARCH_VALUE'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?search='

export const addToFavs = function (_payload) {
  return {
    type: ADD_TO_FAVLIST,
    payload: _payload,
  }
}

export const removeFromFavs = function (_payload) {
  return {
    type: REMOVE_FROM_FAVLIST,
    payload: _payload,
  }
}

export const searchValue = function (_payload) {
  return {
    type: SEARCH_VALUE,
    payload: _payload,
  }
}

export const saveResults = function () {
  return (dispatch, getState) => {
    const currentState = getState()
    console.log('STATO: ', currentState)

    fetch(baseEndpoint + currentState.search.value + '&limit=20')
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('ERRORE NELLA RESPONSE')
        }
      })
      .then((data) => {
        // console.log(data.data)
        dispatch({
          type: SAVE_RESULTS,
          payload: data.data,
        })
        dispatch({
          type: LOADING,
          payload: false,
        })
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
        dispatch({
          type: LOADING,
          payload: false,
        })
        dispatch({
          type: ERROR,
          payload: true,
        })
      })
  }
}
