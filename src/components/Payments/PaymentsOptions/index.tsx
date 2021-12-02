import React from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import PaymentsOptionsIconComponent from './PaymentsOptionsIcon'
import { useAccordionState } from './service'
import './index.css'

import PaymentRelayService from 'services/PaymentRelay'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

function PaymentsOptionsComponent() {
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
              icon={<PaymentsOptionsIconComponent />}
              active={accordionState.getActive() === 'payment-relay'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentRelayService
              recepient="185rxHtU6RxDtbERpcnenNXh2mZCs3PVBC"
              amount={1000}
              currency="BSV"

              onLoad={() => {}}
              onError={() => {}}
              onPayment={() => {}}
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
              icon={<PaymentsOptionsIconComponent />}
              active={accordionState.getActive() === 'payment-handcash'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
        </AccordionItemPanel>
      </AccordionItem>

      {/**
       * Volt
       */}
      <AccordionItem uuid="payment-volt">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Volt / Maxthon VBox"
              subtitle="Pay using the Open Payment Protocol."
              icon={<PaymentsOptionsIconComponent />}
              active={accordionState.getActive() === 'payment-volt'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default PaymentsOptionsComponent
