import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'

type IPaymentRelayComponent = {
  recepient: string;
  amount: number;
  currency: string;

  onLoad: (args: any) => void;
  onPayment: (args: any) => void;
  onError: (args: any) => void;
}

type IScriptInject = {
  scriptTags: any,
}

const handleScriptInject = (args: IPaymentRelayComponent) => ({ scriptTags }: IScriptInject) => {
  if (scriptTags) {
    const scriptTag = scriptTags[0]
    scriptTag.onload = function() {
      const div = document.querySelector('#relayx-button')
      
      // @ts-ignore
      window.relayone.render(div, {
        to: args.recepient,
        amount: args.amount,
        currency: args.currency,

        onLoad: args.onLoad,
        onPayment: args.onPayment,
        onError: args.onError,
      })
    }
  }
}

function PaymentRelayComponent({ recepient, amount, currency, onLoad, onPayment, onError }: IPaymentRelayComponent) {
  const scriptInject = useMemo(() => handleScriptInject({ recepient, amount, currency, onLoad, onPayment, onError }), [
    recepient, amount, currency, onLoad, onPayment, onError
  ])

  if (!recepient || !amount || !currency) {
    return null
  }

  return (
    <>
      <Helmet
        script={[{ src: 'https://one.relayx.io/relayone.js' }]}
        onChangeClientState={(newState, addedTags) => scriptInject(addedTags)}
      />

      <div id="relayx-button"></div>
    </>
  )
}

export default PaymentRelayComponent
