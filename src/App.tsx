import React from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import theme from 'theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponent />
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
