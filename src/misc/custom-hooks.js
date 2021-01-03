import { useEffect, useReducer } from 'react'
import { add, remove } from '../constant'

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
