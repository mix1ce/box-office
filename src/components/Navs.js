import React from 'react'
import { useLocation } from 'react-router'
import { LinkStyled, NavList } from './Navs.styled'

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
]

const Navs = () => {
  const location = useLocation()

  return (
    <div>
      <NavList>
        {LINKS.map(({ to, text }) => (
          <li key={to}>
            <LinkStyled
              to={to}
              className={to === location.pathname ? 'active' : ''}
            >
              {text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  )
}

export default Navs
