import AnypayService from 'services/Anypay'
import { renderHook, act } from '@testing-library/react-hooks'

describe('AnypayService', () => {
  const anypay = renderHook(() => AnypayService())

  test('AnypayService#configure', () => {
    expect(anypay.result.current.getState()).toMatchObject({
      isLoading: true,
      description: '',
      outputs: [],
    })
    act(() => {
      anypay.result.current.configure({
        description: 'Anypay demo invoice',
        outputs: [{ satoshis: 1000, script: '11122223333' }],
      })
    })
    expect(anypay.result.current.getState()).toMatchObject({
      isLoading: false,
      description: 'Anypay demo invoice',
      outputs: [{ satoshis: 1000, script: '11122223333' }],
    })
  })
})
