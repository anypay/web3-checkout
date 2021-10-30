import AnypayService from 'services/Anypay'
import { renderHook, act } from '@testing-library/react-hooks'
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
  })

  test('AnypayService#setupTransaction', () => {
    anypay.result.current.setupTransaction({ outputs, inputs, changeTo: address.toString() })
    anypay.result.current.buildTransaction({ keyPair })
    expect(anypay.result.current.getTransaction()).toEqual('01000000011d85aa9d7a31930dba37e5583a663d6ee7f70006704c25b12df2a44fd70dc277010000006b483045022100eb4b056c34272435c71303987769504ca061292c1e7180fda2c35fbf3e8e8ac1022071b69b63b487c80a18bc4c27f3ddb282e4fab2c6517791cc0dae15a053018584412103844410072031656adfefabdc47c294e6a64b74fd3215478b74cbf54999d030b1ffffffff02e8030000000000001976a91485b55443c7d5b7cd69813136ce428ad861aeb87088ac190b4c00000000001976a9144db43e454efd2125fc8b500cba8403b580e929ae88ac00000000')
  })
})
