import React, { useContext } from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import { useAccordionState } from './service'
import './index.css'

import PaymentRelayService from 'services/PaymentRelay'
import PaymentMoneybuttonService from 'services/PaymentMoneybutton'
import { PaymentsComponentContext } from 'components/Payments/context'
import QRCode from 'react-qr-code'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

function PaymentsOptionsComponent() {
  const anypay = useContext(PaymentsComponentContext)
  const preExpanded = ['payment-relay']
  const accordionState = useAccordionState({ preExpanded })

  return (
    <Accordion
      onChange={accordionState.setActive}
      allowMultipleExpanded={false}
      allowZeroExpanded={false}
      preExpanded={preExpanded}
    >
      {/**
       * Relay
       */}
      <AccordionItem uuid="payment-relay">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Relay"
              subtitle="Swipe to pay using your favourite web wallet."
              active={accordionState.getActive() === 'payment-relay'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentRelayService
              outputs={anypay.getPaymentInputForRelayX().outputs}

              onLoad={anypay.onLoadCallbackForRelayX}
              onError={anypay.onErrorCallbackForRelayX}
              onPayment={anypay.onPaymentCallbackForRelayX}
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
      {/**
       * Relay
       */}
      <AccordionItem uuid="payment-moneybutton">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Moneybutton"
              subtitle="Swipe to pay using Moneybutton."
              active={accordionState.getActive() === 'payment-moneybutton'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentMoneybuttonService
              outputs={anypay.getPaymentInputForMoneybutton().outputs}

              onLoad={anypay.onLoadCallbackForMoneybutton}
              onError={anypay.onErrorCallbackForMoneybutton}
              onPayment={anypay.onPaymentCallbackForMoneybutton}
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

      {/**
       * Handcash
       */}
      <AccordionItem uuid="payment-handcash">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Handcash / Simply Cash / Electrum"
              subtitle="Scan and pay using Simplified Payments / BIP270."
              active={accordionState.getActive() === 'payment-handcash'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <QRCode value={`pay:?r=https://api.anypayinc.com/r/${anypay.state.invoiceId}`} size={128} />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default PaymentsOptionsComponent
