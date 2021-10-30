import AnypayService from 'services/Anypay'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import * as bsv from 'bsv'

describe('AnypayService', () => {
  const privateKey = bsv.PrivKey.Mainnet.fromString('L5GUQs2D6vYAugfeTVeiCnS3BLYvSx2FskjrDQjgpeC3uUsWc5g6')
  const keyPair = bsv.KeyPair.fromPrivKey(privateKey)
  const address = bsv.Address.Mainnet.fromPrivKey(privateKey)

  const outputs = [{ to: '1DBz6V6CmvjZTvfjvWpvvwuM1X7GkRmWEq', satoshis: 1000 },]
  const inputs = [{
    address: '185rxHtU6RxDtbERpcnenNXh2mZCs3PVBC',
    txid: '77c20dd74fa4f22db1254c700600f7e76e3d663a58e537ba0d93317a9daa851d',
    vout: 1,
    amount: 0.0498469,
    satoshis: 4984690,
    value: 4984690,
    height: 711180,
    confirmations: 134,
    scriptPubKey: '76a9144db43e454efd2125fc8b500cba8403b580e929ae88ac',
    script: '76a9144db43e454efd2125fc8b500cba8403b580e929ae88ac',
    outputIndex: 1
  }]

  const anypay = renderHook(() => AnypayService())

  afterEach(async () => {
    await cleanup()
  })
  
  test('AnypayService#configure', () => {
    expect(anypay.result.current.getState()).toMatchObject({
      isLoading: true,
      description: '',
    })
    act(() => {
      anypay.result.current.configure({
        description: 'Anypay demo invoice',
      })
    })
    expect(anypay.result.current.getState()).toMatchObject({
      isLoading: false,
      description: 'Anypay demo invoice',
    })

    act(() => {
      anypay.result.current.configure({
        description: 'Anypay demo invoice',
      })
    })
    act(() => {
      anypay.result.current.setupTransaction({ outputs, inputs, changeTo: address.toString() })
    })
  })
})
