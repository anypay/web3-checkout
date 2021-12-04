import React from 'react'
// @ts-ignore
import MoneyButton from '@moneybutton/react-money-button'

type IPaymentMoneybuttonComponent = {
  outputs: { amount: number, currency: string, script: string };

  onLoad: (args: any) => void;
  onPayment: (args: any) => void;
  onError: (args: any) => void;
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
