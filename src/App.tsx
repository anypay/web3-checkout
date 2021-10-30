import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ModalTemplate from 'templates/Modal'
import PaymentsComponent from 'components/Payments'
import { PaymentsComponentContext } from 'components/Payments/context'
import AnypayService from 'services/Anypay'
import { getWallet } from 'services/Anypay/wallet'
import theme from 'theme'

function App() {
  const anypay = AnypayService()

  useEffect(() => {
    const wallet = getWallet({ privateKeyString: 'L5GUQs2D6vYAugfeTVeiCnS3BLYvSx2FskjrDQjgpeC3uUsWc5g6' })
    anypay.configure({
      description: 'Anypay demo invoice',
    })
    anypay.setupTransaction({
      outputs: wallet.outputs,
      inputs: wallet.inputs,
      changeTo: wallet.address.toString(),
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <PaymentsComponentContext.Provider value={anypay}>
          {!anypay.getState().isLoading ?
            <PaymentsComponent />
          : null}
        </PaymentsComponentContext.Provider>
      </ModalTemplate>
    </ThemeProvider>
  )
}

export default App
