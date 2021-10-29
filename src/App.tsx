import React, { useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService from 'services/Anypay'
import theme from 'theme'

function App() {
  const anypay = AnypayService()

  useCallback(() => {
    anypay.configure({
      description: 'Anypay demo invoice',
      outputs: [],
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          {anypay.getState().isLoading ?
            <PaymentsComponent />
          : null}
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
