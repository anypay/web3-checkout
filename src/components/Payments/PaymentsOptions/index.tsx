import React from 'react'
import PaymentsOptionsItemComponent from './PaymentsOptionsItem'
import PaymentsOptionsIconComponent from './PaymentsOptionsIcon'

function PaymentsOptionsComponent() {
  return (
    <div>
      <PaymentsOptionsItemComponent
        title="Relay"
        subtitle="Swipe to pay using your favourite web wallet."
        icon={<PaymentsOptionsIconComponent />}
      />

      <PaymentsOptionsItemComponent
        title="Handcash / Simply Cash / Electrum"
        subtitle="Scan and pay using Simplified Payments / BIP270."
        icon={<PaymentsOptionsIconComponent />}
      />

      <PaymentsOptionsItemComponent
        title="Volt / Maxthon VBox"
        subtitle="Pay using the Open Payment Protocol."
        icon={<PaymentsOptionsIconComponent />}
      />
    </div>
  )
}

export default PaymentsOptionsComponent
