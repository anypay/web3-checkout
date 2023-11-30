import { Meta } from '@storybook/react'

import ReceiptSummaryComponent from './index'

export default {
  component: ReceiptSummaryComponent,
  title: 'Components/ReceiptSummary',
} as Meta

export const Default = () => (
  <ReceiptSummaryComponent />
)
