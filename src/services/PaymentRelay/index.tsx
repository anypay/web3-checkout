import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'

type IPaymentRelayComponent = {
  outputs: { amount: number, currency: string, script: string };

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
        outputs: args.outputs,

        onLoad: args.onLoad,
        onPayment: args.onPayment,
        onError: args.onError,
      })
    }
  }
}

function PaymentRelayComponent({ outputs, onLoad, onPayment, onError }: IPaymentRelayComponent) {
  const scriptInject = useMemo(() => handleScriptInject({ outputs, onLoad, onPayment, onError }), [
    outputs, onLoad, onPayment, onError
  ])

  if (!outputs) {
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
