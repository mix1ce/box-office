import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'

const Home = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState(null)

  const onInputChange = ({ target: { value } }) => setInput(value)

  const onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) onSearch()
  }

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => setResults(result))
  }

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <MainPageLayout>
      <input
        type="text"
        value={input}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
