import AnypayService from 'services/Anypay'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'

describe('AnypayService', () => {
  test('AnypayService#getState', async () => {
    const anypay = renderHook(() => AnypayService())

    renderHook(async () => {
      await anypay.result.current.init({ invoiceId: 'gO9jGah-o' })
    })

    console.log(anypay.result.current.state())
  })
})
