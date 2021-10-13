import { Meta } from '@storybook/react'

import PaymentsOptionsItemComponent from './PaymentsOptionsItem'
import PaymentsOptionsIconComponent from './PaymentsOptionsIcon'

export default {
  component: PaymentsOptionsItemComponent,
  title: 'Components/PaymentsOptionsItem',
} as Meta

export const Default: React.VFC<{}> = () => (
  <PaymentsOptionsItemComponent
    title="Payment option"
    subtitle="Payment option description, could be long as well"
  />
)

export const WithIcon: React.VFC<{}> = () => (
  <PaymentsOptionsItemComponent
    title="Payment option"
    subtitle="Payment option description, could be long as well"
    icon={<PaymentsOptionsIconComponent />}
  />
)
