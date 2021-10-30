import React from 'react'
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

function PaymentRelayComponent({ recepient, amount, currency, onLoad, onPayment, onError }: IPaymentRelayComponent) {
  function handleScriptInject ({ scriptTags }: IScriptInject) {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = function() {
        const div = document.querySelector('#relayx-button')
        
        // @ts-ignore
        window.relayone.render(div, {
          to: recepient,
          amount: amount,
          currency: currency,

          onLoad,
          onPayment,
          onError,
        })
      }
    }
  }

  return (
    <>
      <Helmet
        script={[{ src: 'https://one.relayx.io/relayone.js' }]}
        onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
      />

      <div id="relayx-button"></div>
    </>
  )
}

export default PaymentRelayComponent
