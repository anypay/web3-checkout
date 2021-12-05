import AnypayService from 'services/Anypay'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as apiMocks from 'services/Anypay/mocks'

var mock = new MockAdapter(axios)

mock.onGet('https://api.anypayinc.com/r/zMjwpQ7kk').reply(200, apiMocks.invoiceReportGetPrepaid)
mock.onGet('https://api.anypayinc.com/invoices/zMjwpQ7kk').reply(200, apiMocks.invoiceGetPrepaid)
mock.onPost('https://api.anypayinc.com/r/zMjwpQ7kk/pay/BSV/bip270').reply(200, apiMocks.invoiceReportPost)

describe('AnypayService', () => {
  test('AnypayService#getState', async () => {
    const anypay = renderHook(() => AnypayService())

    await act(async () => {
      await anypay.result.current.init({ invoiceId: 'zMjwpQ7kk' })
    })

    expect(anypay.result.current.state).toMatchObject({
      initialized: true,
      invoiceReport: apiMocks.invoiceReportGetPrepaid,
    })

    expect(anypay.result.current.getPaymentInputForRelayX()).toEqual({
      outputs: [
        {'amount':0.000608, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 b0b343aa5025eb12f0ff4f63243449df9e4ef223 OP_EQUALVERIFY OP_CHECKSIG'},
        {'amount':0.00007, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 fde8f61612beecbf7532765d17ce9c36c8601878 OP_EQUALVERIFY OP_CHECKSIG'}
      ]
    })

    act(() => {
      anypay.result.current.onPaymentCallbackForRelayX(apiMocks.relayxOnPayment)
    })

    expect(anypay.result.current.getPaymentOutputForRelayX()).toEqual({
      transaction: '0100000001a420cc3165599f5511fbe4558df3dfb3ac7eb0c7cda5479b2320ec4e51b40582040000006b483045022100c7fcaac5a3c8f4ce8b9002fec3a6b42a83299ef1cbb7bef6b598b5e5cdde298f02206e91a62288d243b00c9de020e1d9def2a3e9a2c3881de052357af01f0a6f8d48412102e8c1da1de96f2d3cd9391d37ec5fd01755c9ae01f212046f1914c32a9b103910ffffffff0480ed0000000000001976a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac581b0000000000001976a914fde8f61612beecbf7532765d17ce9c36c860187888ac00000000000000002f006a2231487948587459577947655072485669736e4e645339333156743643716f7555795a0972656c6179782e696fcdd30000000000001976a9148de288360fe7dea1ea4efded972918b5187d3a8c88ac00000000'
    })

    act(() => {
      anypay.result.current.publishBroadcastedTransaction(apiMocks.relayxOnPayment)
    })

    expect(anypay.result.current.state.status).toEqual('broadcasted')
  })
})
