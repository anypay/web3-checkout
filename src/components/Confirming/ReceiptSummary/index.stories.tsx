import { Meta } from '@storybook/react'

import ReceiptSummaryComponent from './index'

export default {
  component: ReceiptSummaryComponent,
  title: 'Components/CunfirmingReceiptSummary',
} as Meta

export const Default: React.VFC<{}> = () => (
  <ReceiptSummaryComponent />
)
