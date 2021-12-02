import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService from 'services/Anypay'
import theme from 'theme'

function App() {
  const anypay = AnypayService()

  useEffect(() => {
    anypay.init({ invoiceId: 'gO9jGah-o' })
  }, [])

  console.log(anypay.state())

  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          <PaymentsComponent />
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
