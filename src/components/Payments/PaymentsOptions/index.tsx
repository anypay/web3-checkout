import React from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import PaymentsOptionsIconComponent from './PaymentsOptionsIcon'

import PaymentRelayService from 'services/PaymentRelay'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

function PaymentsOptionsComponent() {
  return (
    <Accordion>
      {/**
       * Relay
       */}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Relay"
              subtitle="Swipe to pay using your favourite web wallet."
              icon={<PaymentsOptionsIconComponent />}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentRelayService
              recepient="me@azimgd.com"
              amount={40}
              currency="BSV"
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

      {/**
       * Handcash
       */}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Handcash / Simply Cash / Electrum"
              subtitle="Scan and pay using Simplified Payments / BIP270."
              icon={<PaymentsOptionsIconComponent />}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
        </AccordionItemPanel>
      </AccordionItem>

      {/**
       * Vold
       */}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Volt / Maxthon VBox"
              subtitle="Pay using the Open Payment Protocol."
              icon={<PaymentsOptionsIconComponent />}
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
