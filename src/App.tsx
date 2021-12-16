import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import PaymentsLoadingComponent from 'components/Payments/PaymentsLoading'
import PaymentsErrorComponent from 'components/Payments/PaymentsError'
import ReceiptComponent from 'components/Receipt'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService, { IAnypayServiceResponse } from 'services/Anypay'
import theme from 'theme'

const getInvoiceIdFromPathname = (pathname: string) => {
  return pathname.split('/invoices/')[1].split('/')[0]
}

type IAppComponent = {
  onStateChanged?: (anypay: IAnypayServiceResponse) => void;
}

function AppComponent({ onStateChanged } : IAppComponent) {
  const anypay = AnypayService()

  useEffect(() => {
    try {
      const invoiceId = getInvoiceIdFromPathname(window.location.pathname)
      anypay.init({ invoiceId })
    } catch (error) {
      anypay.fail({ error: error as string })
    }
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (anypay.state.invoiceId) {
      const interval = anypay.pollInvoice()
      return () => clearInterval(interval)
    }
  // eslint-disable-next-line
  }, [anypay.state.initialized])

  useEffect(() => {
    if (anypay.state.status === 'broadcasted' && anypay.state.processed?.provider === 'relayx') {
      const payload = anypay.getPaymentOutputForRelayX()
      anypay.publishBroadcastedTransaction(payload)
    } else if (anypay.state.status === 'broadcasted' && anypay.state.processed?.provider === 'moneybutton') {
      const payload = anypay.getPaymentOutputForMoneybutton()
      anypay.publishBroadcastedTransaction(payload)
    }
  // eslint-disable-next-line
  }, [anypay.state.status])

  useEffect(() => {
    // @ts-ignore
    onStateChanged(anypay)
  // eslint-disable-next-line
  }, [anypay])
  
  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          {!anypay.state.initialized ?
            <PaymentsLoadingComponent />
          : null}

          {anypay.state.initialized && anypay.state.status !== 'failure' && anypay.state.invoice?.status !== 'paid' ?
            <PaymentsComponent />
          : null}


          {anypay.state.initialized && anypay.state.status !== 'failure' && anypay.state.invoice?.status === 'paid' ?
            <ReceiptComponent />
          : null}

          {anypay.state.initialized && anypay.state.status === 'failure' ?
            <PaymentsErrorComponent />
          : null}
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default AppComponent
