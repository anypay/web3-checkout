import AnypayService from 'services/Anypay'
import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as apiMocks from 'services/Anypay/mocks'

var mock = new MockAdapter(axios)
const config = { invoiceId: 'zMjwpQ7kk' }

describe('AnypayService', () => {
  afterEach(() => {
    mock.resetHandlers()
  })

  test('AnypayService#workflow', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').reply(200, apiMocks.invoiceReportGetPrepaid)
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').reply(200, apiMocks.invoiceGetPrepaid)
    mock.onPost('https://api.anypayx.com/r/zMjwpQ7kk/pay/BSV/bip270').reply(200, apiMocks.invoiceReportPost)
    
    const customConfig = {
      invoiceId: config.invoiceId,
      onAnypayPaymentSuccess: jest.fn(),
      onAnypayPaymentFailure: jest.fn(),
    }

    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
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

  test('AnypayService#init/success', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').reply(200, apiMocks.invoiceReportGetPrepaid)
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').reply(200, apiMocks.invoiceGetPrepaid)
    mock.onPost('https://api.anypayx.com/r/zMjwpQ7kk/pay/BSV/bip270').reply(200, apiMocks.invoiceReportPost)

    const customConfig = {
      invoiceId: config.invoiceId,
      onAnypayLoadSuccess: jest.fn(),
      onAnypayLoadFailure: jest.fn(),
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.state).toMatchObject({
      initialized: true,
      status: 'pending',
      invoice: apiMocks.invoiceGetPrepaid.invoice,
    })
    expect(customConfig.onAnypayLoadSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        state: anypay.result.current.state
       })
    )
    expect(customConfig.onAnypayLoadFailure).not.toHaveBeenCalled()
  })

  test('AnypayService#init/failure', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').networkError()
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').networkError()

    const customConfig = {
      invoiceId: config.invoiceId,
      onAnypayLoadSuccess: jest.fn(),
      onAnypayLoadFailure: jest.fn(),
    }

    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.state).toMatchObject({
      initialized: true,
      status: 'failure',
    })

    expect(customConfig.onAnypayLoadSuccess).not.toHaveBeenCalled()
    expect(customConfig.onAnypayLoadFailure).toHaveBeenCalled()
  })

  test('AnypayService#fail', async () => {
    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.fail({ error: 'Network error' })
    })

    expect(anypay.result.current.state).toMatchObject({
      initialized: true,
      status: 'failure',
    })
  })

  test.skip('AnypayService#getPaymentInputForRelayX/success', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').reply(200, apiMocks.invoiceReportGetPrepaid)
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').reply(200, apiMocks.invoiceGetPrepaid)

    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.getPaymentInputForRelayX()).toEqual({
      outputs: [
        {'amount':0.000608, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 b0b343aa5025eb12f0ff4f63243449df9e4ef223 OP_EQUALVERIFY OP_CHECKSIG'},
        {'amount':0.00007, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 fde8f61612beecbf7532765d17ce9c36c8601878 OP_EQUALVERIFY OP_CHECKSIG'}
      ]
    })   
  })

  test('AnypayService#getPaymentInputForRelayX/failure', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').networkError()
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').networkError()

    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.getPaymentInputForRelayX()).toEqual({
      outputs: []
    })   
  })

  test.skip('AnypayService#getPaymentInputForMoneybutton/success', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').reply(200, apiMocks.invoiceReportGetPrepaid)
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').reply(200, apiMocks.invoiceGetPrepaid)

    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.getPaymentInputForMoneybutton()).toEqual({
      outputs: [
        {'amount':0.000608, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 b0b343aa5025eb12f0ff4f63243449df9e4ef223 OP_EQUALVERIFY OP_CHECKSIG'},
        {'amount':0.00007, currency: 'BSV', 'to': 'OP_DUP OP_HASH160 fde8f61612beecbf7532765d17ce9c36c8601878 OP_EQUALVERIFY OP_CHECKSIG'}
      ]
    })   
  })

  test('AnypayService#getPaymentInputForMoneybutton/failure', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').networkError()
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').networkError()

    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.init()
    })

    expect(anypay.result.current.getPaymentInputForMoneybutton()).toEqual({
      outputs: []
    })   
  })

  test('AnypayService#publishBroadcastedTransaction/failure', async () => {
    mock.onGet('https://api.anypayx.com/r/zMjwpQ7kk').networkError()
    mock.onGet('https://api.anypayx.com/api/v1/invoices/zMjwpQ7kk').networkError()

    const anypay = renderHook(() => AnypayService({ config }))

    await act(async () => {
      await anypay.result.current.init()
    })

    await act(async () => {
      await expect((() => anypay.result.current.publishBroadcastedTransaction({})))
      .rejects
      .toThrow('Transaction could not be broadcasted as it wasn\'t initialized')
    })

    expect(anypay.result.current.state.status).toEqual('failure')
  })

  test('AnypayService#onLoadCallbackForRelayX', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onLoadCallbackForRelayX: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onLoadCallbackForRelayX(1)
    })

    expect(customConfig.onLoadCallbackForRelayX).toHaveBeenCalledWith(1)
  })

  test('AnypayService#onErrorCallbackForRelayX', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onErrorCallbackForRelayX: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onErrorCallbackForRelayX(1)
    })

    expect(customConfig.onErrorCallbackForRelayX).toHaveBeenCalledWith(1)
  })

  test('AnypayService#onPaymentCallbackForRelayX', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onPaymentCallbackForRelayX: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onPaymentCallbackForRelayX(1)
    })

    expect(customConfig.onPaymentCallbackForRelayX).toHaveBeenCalledWith(1)
  })

  test('AnypayService#onLoadCallbackForMoneybutton', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onLoadCallbackForMoneybutton: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onLoadCallbackForMoneybutton(1)
    })

    expect(customConfig.onLoadCallbackForMoneybutton).toHaveBeenCalledWith(1)
  })

  test('AnypayService#onErrorCallbackForMoneybutton', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onErrorCallbackForMoneybutton: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onErrorCallbackForMoneybutton(1)
    })

    expect(customConfig.onErrorCallbackForMoneybutton).toHaveBeenCalledWith(1)
  })

  test('AnypayService#onPaymentCallbackForMoneybutton', async () => {
    const customConfig = {
      invoiceId: config.invoiceId,
      onPaymentCallbackForMoneybutton: jest.fn()
    }
    const anypay = renderHook(() => AnypayService({ config: customConfig }))

    await act(async () => {
      await anypay.result.current.init()
    })

    act(() => {
      anypay.result.current.onPaymentCallbackForMoneybutton(1)
    })

    expect(customConfig.onPaymentCallbackForMoneybutton).toHaveBeenCalledWith(1)
  })
})
