import AnypayService from 'services/Anypay'
import { renderHook, act } from '@testing-library/react-hooks'
import * as bsv from 'bsv'

describe('AnypayService', () => {
  const anypay = renderHook(() => AnypayService())
  const outputs = [{ satoshis: 1000, script: '11122223333' }]
  const inputs = [{
    address: '1E9URzUqKRgYSV8hHtfgm6WAB9bxhLJos5',
    txid: 'a02d809b43e279742bf9fc847531b389b0a1728a46ad05a3261cd8c71b1ae86e',
    vout: 0,
    amount: 0.0013,
    satoshis: 130000,
    value: 130000,
    height: 711028,
    confirmations: 271,
    scriptPubKey: '76a9149033dc6c621604f61f70bada8d9adbdc1105806888ac',
    script: '76a9149033dc6c621604f61f70bada8d9adbdc1105806888ac',
    outputIndex: 0
  }]
  
  const changeTo = '1E9URzUqKRgYSV8hHtfgm6WAB9bxhLJos5'
  const privateKey = bsv.PrivKey.Mainnet.fromRandom()
  const keyPair = bsv.KeyPair.fromPrivKey(privateKey)

  test('AnypayService#configure', () => {
    expect(anypay.result.current.getState()).toMatchObject({
      isLoading: true,
      description: '',
      outputs: [],
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
    anypay.result.current.setupTransaction({ outputs, inputs, changeTo })
    anypay.result.current.buildTransaction({ keyPair })
    console.log(anypay.result.current.getTransaction())
  })
})
