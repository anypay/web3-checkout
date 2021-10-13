import React from 'react'
import { Helmet } from 'react-helmet'

type IPaymentRelayComponent = {
  recepient: string;
  amount: number;
  currency: string;
}

function PaymentRelayComponent({ recepient, amount, currency }: IPaymentRelayComponent) {
  return (
    <>
      <Helmet>
        <script src="https://one.relayx.io/relayone.js"></script>
        <script>
          {`
            const div = document.querySelector('#relayx-button')
            window.addEventListener('load', function() {
              relayone.render(div, {
                to: "${recepient}",
                amount: "${amount}",
                currency: "${currency}"
              })
            })
          `}
        </script>
      </Helmet>

      <div id="relayx-button"></div>
    </>
  )
}

export default PaymentRelayComponent
