import { Meta } from '@storybook/react'

import ReceiptSummaryComponent from './index'

export default {
  component: ReceiptSummaryComponent,
  title: 'Components/ConfirmingReceiptSummary',
} as Meta

export const Default = () => (
  <ReceiptSummaryComponent />
)
