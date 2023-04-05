import { AppComponentWrapper } from 'App'
import { render } from '@testing-library/react'

const anypay = {
  init: jest.fn(),
  fail: jest.fn(),
  pollInvoice: jest.fn(),
  getPaymentInputForRelayX: jest.fn(),
  getPaymentOutputForRelayX: jest.fn(),
  getPaymentInputForMoneybutton: jest.fn(),
  getPaymentOutputForMoneybutton: jest.fn(),
  state: {
    initialized: false,
    status: 'pending',
    invoiceId: 'zMjwpQ7kk',
    invoiceReport: {},
    invoice: {},
    processed: {
      provider: '',
      payload: {},
    },
  },

  onLoadCallbackForRelayX: jest.fn(),
  onErrorCallbackForRelayX: jest.fn(),
  onPaymentCallbackForRelayX: jest.fn(),

  onLoadCallbackForMoneybutton: jest.fn(),
  onErrorCallbackForMoneybutton: jest.fn(),
  onPaymentCallbackForMoneybutton: jest.fn(),

  publishBroadcastedTransaction: jest.fn(),
  getAmountFromSatoshis: jest.fn(),
  getCurrencyFromNetwork: jest.fn(),
}

const renderAppComponentWrapper = ({ children, anypay }: any) => render(
  <AppComponentWrapper anypay={anypay}>
    {() => {
      children()
      return null
    }}
  </AppComponentWrapper>
)

describe('AppComponentWrapper', () => {
  test('render#init', () => {
    const children = jest.fn()
    renderAppComponentWrapper({ children, anypay })
    expect(anypay.init).toHaveBeenCalled()
    expect(anypay.fail).not.toHaveBeenCalled()
  })

  test('render#fail', () => {
    const children = jest.fn()
    anypay.init.mockImplementationOnce(() => {
      throw new Error('Failure')
    })
    renderAppComponentWrapper({ children, anypay })
    expect(anypay.init).toHaveBeenCalled()
    expect(anypay.fail).toHaveBeenCalled()
  })

  test('render#poll', () => {
    const children = jest.fn()
    anypay.state.invoiceId = 'zMjwpQ7kk'
    renderAppComponentWrapper({ children, anypay })
    expect(anypay.pollInvoice).toHaveBeenCalled()
  })

  test('render#getPaymentOutputForRelayX', () => {
    const children = jest.fn()
    anypay.state.status = 'broadcasted'
    anypay.state.processed.provider = 'relayx'
    renderAppComponentWrapper({ children, anypay })
    expect(anypay.publishBroadcastedTransaction).toHaveBeenCalled()
  })

  test('render#getPaymentOutputForMoneybutton', () => {
    const children = jest.fn()
    anypay.state.status = 'broadcasted'
    anypay.state.processed.provider = 'moneybutton'
    renderAppComponentWrapper({ children, anypay })
    expect(anypay.publishBroadcastedTransaction).toHaveBeenCalled()
  })
})