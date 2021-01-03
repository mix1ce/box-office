import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid'
import CustomRadio from '../components/CustomRadio'
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid'
import { apiGet } from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks'
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled'

const Home = () => {
  const [input, setInput] = useLastQuery()
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      )
    }

    return null
  }

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        value={input}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowSearh}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowSearh}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
