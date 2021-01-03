import { useEffect, useReducer, useState } from 'react'
import { apiGet } from './config'
import { add, remove, fetchFailed, fetchSuccess } from './constant'

function showsReducer(prevState, action) {
  switch (action.type) {
    case add:
      return [...prevState, action.showId]

    case remove:
      return prevState.filter(showId => showId !== action.showId)

    default:
      return prevState
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    const persisted = localStorage.getItem(key)
    return persisted ? JSON.parse(persisted) : init
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, dispatch]
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key)
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key)
    return persisted ? JSON.parse(persisted) : ''
  })

  const setPersistedInput = newState => {
    setInput(newState)
    sessionStorage.setItem(key, JSON.stringify(newState))
  }

  return [input, setPersistedInput]
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case fetchSuccess:
      return { ...prevState, isLoading: false, show: action.show }
    case fetchFailed:
      return { ...prevState, isLoading: false, error: action.error }
    default:
      return prevState
  }
}

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: fetchSuccess, show: results })
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: fetchFailed, error: err.message })
        }
      })
    return () => (isMounted = false)
  }, [showId])

  return state
}
