import React, { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import type {
  IAnypayServiceGetPaymentInputForRelayXResponse,
  IAnypayServiceOnLoadCallbackForRelayX,
  IAnypayServiceOnPaymentCallbackForRelayX,
  IAnypayServiceOnErrorCallbackForRelayX,
  IAnypayPaymentOption
} from 'services/Anypay'


type IPaymentRelayXComponent = {
  onLoad: IAnypayServiceOnLoadCallbackForRelayX;
  onPayment: IAnypayServiceOnPaymentCallbackForRelayX;
  onError: IAnypayServiceOnErrorCallbackForRelayX;
  paymentOption: IAnypayPaymentOption;
}


type IScriptInject = {
  scriptTags: any,
}
function PaymentRelayComponent({ paymentOption, onLoad, onPayment, onError }: IPaymentRelayXComponent) {

  console.log('PaymentRelayComponent', {paymentOption})

  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {

    if (!scriptLoaded || !paymentOption) { return }
   
    //@ts-ignore
    const outputs = paymentOption.instructions[0].outputs.map((output) => {

      return {
        to: output.address,
        amount: output.amount * 100_000_000 // convert from satoshis to BSV for Relayx API
      }

    })

    //@ts-ignore
    window.relayone.render({
      outputs,
      devMode: true,
      onPayment(payment: any) {
        console.log('relayone.payment', payment)
      },
      onError(error: any) {
        console.error('relayone.error', error)
      },
      onLoad(event: any) {
        console.log('relayone.onLoad', event)
      },
    })


  }, [scriptLoaded, paymentOption])

  const handleScriptInject = (args: IPaymentRelayXComponent) => ({ scriptTags }: IScriptInject) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = function() {
        const div = document.querySelector('#relayx-button')

        setScriptLoaded(true)
      }
    }
  }


  const scriptInject = useMemo(() => handleScriptInject({ paymentOption, onLoad, onPayment, onError }), [
    paymentOption, onLoad, onPayment, onError
  ])

  if (!paymentOption) {
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
