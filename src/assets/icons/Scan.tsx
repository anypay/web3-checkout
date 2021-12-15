import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

function ScanComponent() {
  const theme = useContext(ThemeContext)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2.5" transform="translate(0.5 0.5)" fill="none" stroke={theme.colors.primary} stroke-miterlimit="10">
        <line x1="1" y1="12" x2="23" y2="12" stroke={theme.colors.primary}></line>
        <polyline points="4,7.00009 4,4 7.00009,4 "></polyline>
        <polyline points="16.99991,4 20,4 20,7.00009 "></polyline>
        <polyline points="20,16.99991 20,20 16.99991,20 "></polyline>
        <polyline points="7.00009,20 4,20 4,16.99991 "></polyline>
      </g>
    </svg>
  )
}

export default ScanComponent
