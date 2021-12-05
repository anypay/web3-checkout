import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import PaymentsLoadingComponent from 'components/Payments/PaymentsLoading'
import PaymentsErrorComponent from 'components/Payments/PaymentsError'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService from 'services/Anypay'
import theme from 'theme'

const getInvoiceIdFromPathname = (pathname: string) => {
  return pathname.split('/invoices/')[1].split('/')[0]
}

function App() {
  const anypay = AnypayService()

  useEffect(() => {
    try {
      const invoiceId = getInvoiceIdFromPathname(window.location.pathname)
      anypay.init({ invoiceId })
    } catch (error) {
      anypay.fail({ error: error as string })
    }
  }, [])

  useEffect(() => {
    if (anypay.state.status === 'broadcasted' && anypay.state.processed?.provider === 'relayx') {
      const payload = anypay.getPaymentOutputForRelayX()
      anypay.publishBroadcastedTransaction(payload)
    } else if (anypay.state.status === 'broadcasted' && anypay.state.processed?.provider === 'moneybutton') {
      const payload = anypay.getPaymentOutputForMoneybutton()
      anypay.publishBroadcastedTransaction(payload)
    }
  }, [anypay.state.status])
  
  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          {!anypay.state.initialized ?
            <PaymentsLoadingComponent />
          : null}

          {anypay.state.initialized && anypay.state.status !== 'failure' ?
            <PaymentsComponent />
          : null}

          {anypay.state.initialized && anypay.state.status === 'failure' ?
            <PaymentsErrorComponent />
          : null}
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
