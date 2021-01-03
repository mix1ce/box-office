import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'

const Home = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState(null)
  const [searchOption, setsearchOption] = useState('shows')

  const isShowSearh = searchOption === 'shows'

  const onInputChange = ({ target: { value } }) => setInput(value)

  const onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) onSearch()
  }

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResults(result)
    )
  }

  const onRadioChange = ({ target: { value } }) => {
    setsearchOption(value)
  }

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>
    }

    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ))
    }

    return null
  }

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        value={input}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowSearh}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowSearh}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
