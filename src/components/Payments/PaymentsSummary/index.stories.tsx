import { Meta } from '@storybook/react'

import PaymentsSummaryComponent from './index'

export default {
  component: PaymentsSummaryComponent,
  title: 'Components/PaymentsSummary',
} as Meta

export const Default = () => (
  <PaymentsSummaryComponent />
)
