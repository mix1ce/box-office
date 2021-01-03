import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
  const [input, setInput] = useState('')

  const onInputChange = ({ target: { value } }) => setInput(value)

  const onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) onSearch()
  }

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(result => console.log(result))
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
    </MainPageLayout>
  )
}

export default Home
