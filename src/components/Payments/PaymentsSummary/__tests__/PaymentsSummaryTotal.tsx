import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import PaymentsSummaryTotalComponent from 'components/Payments/PaymentsSummary/PaymentsSummaryTotal'

jest.mock('services/Anypay');

test('PaymentsSummaryTotal', () => {
  // render(<PaymentsSummaryTotalComponent />)
})