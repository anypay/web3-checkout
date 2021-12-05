import React from 'react'
// @ts-ignore
import MoneyButton from '@moneybutton/react-money-button'
import type {
  IAnypayServiceGetPaymentInputForMoneybuttonResponse,
  IAnypayServiceOnLoadCallbackForMoneybutton,
  IAnypayServiceOnPaymentCallbackForMoneybutton,
  IAnypayServiceOnErrorCallbackForMoneybutton,
} from 'services/Anypay'

type IPaymentMoneybuttonComponent = {
  outputs: IAnypayServiceGetPaymentInputForMoneybuttonResponse['outputs'];

  onLoad: IAnypayServiceOnLoadCallbackForMoneybutton;
  onPayment: IAnypayServiceOnPaymentCallbackForMoneybutton;
  onError: IAnypayServiceOnErrorCallbackForMoneybutton;
}

function PaymentMoneybuttonComponent({ outputs, onLoad, onPayment, onError }: IPaymentMoneybuttonComponent) {
  if (!outputs) {
    return null
  }

  return (
    <MoneyButton
      outputs={outputs}
      onPayment={onPayment}
      onError={onError}
      onLoad={onLoad}
    />
  )
}

export default PaymentMoneybuttonComponent
