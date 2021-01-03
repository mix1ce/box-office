import React from 'react'
import ShowCard from './ShowCard'

import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'
import { useShows } from '../../misc/custom-hooks'
import { add, remove } from '../../misc/constant'

const ShowGrid = ({ data }) => {
  const [starredShows, dispathStarred] = useShows()

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id)

        const onStarClick = () => {
          if (isStarred) {
            dispathStarred({ type: remove, showId: show.id })
          } else {
            dispathStarred({ type: add, showId: show.id })
          }
        }

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        )
      })}
    </FlexGrid>
  )
}

export default ShowGrid
