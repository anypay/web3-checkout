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
    anypay.init({ invoiceId: '-8A64Ef5L' })
  }, [])

  useEffect(() => {
    if (anypay.state.status === 'broadcasted') {
      const payload = anypay.getPaymentOutputForRelayX()
      // @ts-ignore
      anypay.publishBroadcastedTransaction(payload)
    }
  }, [anypay.state.status])
  
  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          {anypay.state.initialized ?
            <PaymentsComponent />
          : null}
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
