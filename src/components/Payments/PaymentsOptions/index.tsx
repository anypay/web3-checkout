import React, { useContext } from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import { useAccordionState } from './service'
import './index.css'

import PaymentRelayService from 'services/PaymentRelay'
import PaymentMoneybuttonService from 'services/PaymentMoneybutton'
import { PaymentsComponentContext } from 'components/Payments/context'
//import QRCode from 'react-qr-code'

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
              subtitle="Swipe to pay using Relay wallet"
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
              title="MoneyButton"
              subtitle="Swipe to pay using MoneyButton"
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
       * HandCash
       */}
      <AccordionItem uuid="payment-handcash">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="HandCash & Simply Cash"
              subtitle="Click to open wallet app"
              active={accordionState.getActive() === 'payment-handcash'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>

          <PaymentsOptionsItemBodyComponent>
        {/* eslint-disable-next-line */}
          <h3>< a target="_blank" rel="noreferrer" href="`pay:?r=https://api.anypayinc.com/r/${anypay.state.invoiceId}`">Scan QR to Pay</a></h3>
          </PaymentsOptionsItemBodyComponent>


        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem uuid="payment-electrum">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Electrum SV"
              subtitle="Copy Payment Request URL"
              active={accordionState.getActive() === 'payment-electrum'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <small>pay:?r=https://api.anypayinc.com/r/${anypay.state.invoiceId}</small>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default PaymentsOptionsComponent
