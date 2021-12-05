import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import type {
  IAnypayServiceGetPaymentInputForRelayXResponse,
  IAnypayServiceOnLoadCallbackForRelayX,
  IAnypayServiceOnPaymentCallbackForRelayX,
  IAnypayServiceOnErrorCallbackForRelayX,
} from 'services/Anypay'

type IPaymentRelayXComponent = {
  outputs: IAnypayServiceGetPaymentInputForRelayXResponse['outputs'];

  onLoad: IAnypayServiceOnLoadCallbackForRelayX;
  onPayment: IAnypayServiceOnPaymentCallbackForRelayX;
  onError: IAnypayServiceOnErrorCallbackForRelayX;
}

type IScriptInject = {
  scriptTags: any,
}

const handleScriptInject = (args: IPaymentRelayXComponent) => ({ scriptTags }: IScriptInject) => {
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

function PaymentRelayComponent({ outputs, onLoad, onPayment, onError }: IPaymentRelayXComponent) {
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
