import AnypayService from 'services/Anypay'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'

describe('AnypayService', () => {
  test('AnypayService#getState', async () => {
    const anypay = renderHook(() => AnypayService())

    await act(async () => {
      await anypay.result.current.init({ invoiceId: 'gO9jGah-o' })
    })

    expect(anypay.result.current.state()).toMatchObject({
      initialized: true,
      invoice: {
        network: 'bitcoin-sv',
        paymentUrl: 'https://api.anypayinc.com/r/JY7s6toFP/pay/BSV/bip270',
      },
    })
  })
})
