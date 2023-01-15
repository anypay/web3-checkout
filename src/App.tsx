import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import PaymentsLoadingComponent from 'components/Payments/PaymentsLoading'
import PaymentsErrorComponent from 'components/Payments/PaymentsError'
import ReceiptComponent from 'components/Receipt'
import ConfirmingComponent from 'components/Confirming'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService, { IAnypayService, IAnypayServiceResponse } from 'services/Anypay'
import theme from 'theme'
import Modal from 'react-modal'

export function AppComponentWrapper({ anypay, children } : { anypay: IAnypayServiceResponse, children: any }) {
  useEffect(() => {
    try {
      anypay.init()
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

  return children({ anypay })
}

export function AppComponent({ anypay } : { anypay: IAnypayServiceResponse }) {
  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={anypay.state.modal?.isOpen || false} style={theme.modal}>
        <ModalTemplate>
          <PaymentsComponentContext.Provider value={anypay}>
            {!anypay.state.initialized ?
              <PaymentsLoadingComponent />
            : null}

            {anypay.state.initialized && anypay.state.status !== 'failure' && anypay.state.invoice?.status === 'unpaid' ?
              <PaymentsComponent />
            : null}


            {anypay.state.initialized && anypay.state.status !== 'failure' && anypay.state.invoice?.status === 'paid' ?
              <ReceiptComponent />
            : null}

            {anypay.state.initialized && anypay.state.status !== 'failure' && anypay.state.invoice?.status === 'confirming' ?
              <ConfirmingComponent />
            : null}

            {anypay.state.initialized && anypay.state.status === 'failure' ?
              <PaymentsErrorComponent />
            : null}
          </PaymentsComponentContext.Provider>
        </ModalTemplate>
      </Modal>
    </ThemeProvider>
  )
}

const Application = ({ config }: IAnypayService) => {
  const anypay = AnypayService({ config })
  return (
    <AppComponentWrapper anypay={anypay}>
      {AppComponent}
    </AppComponentWrapper>
  )
}

export default Application