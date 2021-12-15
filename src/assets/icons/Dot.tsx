import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

function DotComponent() {
  const theme = useContext(ThemeContext)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="#F7F7F7">
        <path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z" fill={theme.colors.white}></path>
      </g>
    </svg>
  )
}

export default DotComponent
