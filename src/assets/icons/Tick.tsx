import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

function TickComponent() {
  const theme = useContext(ThemeContext)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="#F7F7F7">
        <path d="M10,17a1,1,0,0,1-.707-.293L4.586,12,6,10.586l4,4,8-8L19.414,8l-8.707,8.707A1,1,0,0,1,10,17Z" fill={theme.colors.white}></path>
      </g>
    </svg>
  )
}

export default TickComponent
