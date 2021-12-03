import AnypayService from 'services/Anypay'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'

describe('AnypayService', () => {
  test('AnypayService#getState', async () => {
    const anypay = renderHook(() => AnypayService())

    await act(async () => {
      await anypay.result.current.init({ invoiceId: 'gO9jGah-o' })
    })

    expect(anypay.result.current.state).toMatchObject({
      initialized: true,
      invoice: {
        network: 'bitcoin-sv',
        paymentUrl: 'https://api.anypayinc.com/r/JY7s6toFP/pay/BSV/bip270',
      },
    })

    expect(anypay.result.current.getPaymentInputForRelayX()).toEqual({
      outputs: [
        {'script':'76a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac','amount':0.007712, currency: 'BSV'},
        {'script':'76a914fde8f61612beecbf7532765d17ce9c36c860187888ac','amount':0.00006, currency: 'BSV'}
      ]
    })
  })
})
