import axios from 'axios'
import { useState } from 'react'
import * as bsv from 'bsv'

export type IApiService = {
}

export type IApiServiceResponse = {
  invoiceGet: (state: IApiServiceGet) => IApiServiceGetResponse
  invoicePost: (state: IApiServicePost) => IApiServicePostResponse
}

export type IApiServiceGet = {
  invoiceId: string
}

export type IApiServiceGetResponse = Promise<{
}>

export type IApiServicePost = {
  invoiceId: string
}

export type IApiServicePostResponse = Promise<{
}>

const Api = () => {
  const instance = axios.create({
    baseURL: 'https://api.anypayinc.com/'
  })

  // @ts-ignore
  const invoiceGet = async ({ invoiceId }: IApiServiceGet) : IApiServiceGetResponse => {
    const request = await instance.get(`/r/${invoiceId}`)
    return request.data
  }

  // @ts-ignore
  const invoicePost = async ({ invoiceId }: IApiServicePost, payload) : IApiServicePostResponse => {
    const request = await instance.post(`/r/${invoiceId}/pay/BSV/bip270`, payload)
    return request.data
  }

  return ({
    invoiceGet,
    invoicePost,
  })
}

/**
 * 
 */
export type IInvoiceResponse = {
  network: 'bitcoin-sv' | string
  outputs: { script: string, amount: number }[]
  creationTimestamp: string
  expirationTimestamp: string
  memo: string
  paymentUrl: string
  merchantData: string
}

export type IStateServiceResponse = {
  set: (state: IStateServiceSet) => IStateServiceSetResponse
  state: IStateServiceGetResponse
}

export type IStateServiceState = {
  initialized: boolean
  invoice: IInvoiceResponse | {}
  status: 'pending' | 'broadcasted' | 'published' | 'failure'
  processed: {}
}

export type IStateServiceSet = IStateServiceState & {
}

export type IStateServiceSetResponse = void

export type IStateServiceGet = void

export type IStateServiceGetResponse = IStateServiceState

const State = () : IStateServiceResponse => {
  const [state, setState] = useState<IStateServiceState>({
    initialized: false,
    invoice: {},
    status: 'pending',
    processed: {},
  })

  const set = (payload: IStateServiceSet) : IStateServiceSetResponse => {
    setState(state => ({ ...state, ...payload }))
  }

  return ({
    set,
    state,
  })
}

/**
 * Anypay payment service
 */
export type IAnypayService = {
}

export type IAnypayServiceResponse = {
  init: (state: IAnypayServiceInit) => IAnypayServiceInitResponse
  getPaymentInputForRelayX: () => IAnypayServiceInitResponse
  getPaymentOutputForRelayX: () => IAnypayServiceInitResponse
  getPaymentOutputForMoneybutton: () => IAnypayServiceInitResponse
  getPaymentInputForMoneybutton: () => IAnypayServiceInitResponse
  state: IStateServiceGetResponse
  onLoadCallbackForRelayX: () => {}
  onErrorCallbackForRelayX: () => {}
  onPaymentCallbackForRelayX: () => {}

  onLoadCallbackForMoneybutton: () => {}
  onErrorCallbackForMoneybutton: () => {}
  onPaymentCallbackForMoneybutton: () => {}

  getAmountFromSatoshis: (state: number) => number
  getCurrencyFromNetwork: (state: string) => string
}

export type IAnypayServiceInit = IApiServiceGet & {
}

export type IAnypayServiceInitResponse = void

const AnypayService = () : IAnypayServiceResponse => {
  const state = State()
  const api = Api()

  const getCurrencyFromNetwork = (currency: string) => {
    if (currency === 'bitcoin-sv') {
      return 'BSV'
    }

    throw new Error('Uknown currency provided')
  }

  const getAmountFromSatoshis = (amount: number) => {
    return amount / 100000000
  }

  // @ts-ignore
  const init = async ({ invoiceId } : IAnypayServiceInit) : IAnypayServiceInitResponse => {
    const invoice = await api.invoiceGet({ invoiceId })

    state.set({
      // @ts-ignore
      invoiceId,
      initialized: true,
      invoice,
      status: 'pending',
      processed: {},
    })
  }

  const getPaymentInputForRelayX = () => {
    const outputsMapper = (output: { script: string, amount: number }) => {
      const script = new bsv.Script(output.script)

      return {
        to: script.toASM(),
        amount: getAmountFromSatoshis(output.amount),
        // @ts-ignore
        currency: getCurrencyFromNetwork(state.state.invoice.network),
      }
    }
    // @ts-ignore
    const outputs = state.state.invoice.outputs.map(outputsMapper)
    return {
      outputs,
    }
  }

  const getPaymentOutputForRelayX = () => {
    // @ts-ignore
    if (state.state.processed.provider !== 'relayx') {
      throw new Error('Incompatible network provider, only relayx is supported')
    }

    return {
      // @ts-ignore
      transaction: state.state.processed.payload.rawTx
    }
  }

  const getPaymentInputForMoneybutton = () => {
    const outputsMapper = (output: { script: string, amount: number }) => {
      const script = new bsv.Script(output.script)

      return {
        to: script.toASM(),
        amount: getAmountFromSatoshis(output.amount),
        // @ts-ignore
        currency: getCurrencyFromNetwork(state.state.invoice.network),
      }
    }
    // @ts-ignore
    const outputs = state.state.invoice.outputs.map(outputsMapper)
    return {
      outputs,
    }
  }

  const getPaymentOutputForMoneybutton = () => {
    // @ts-ignore
    if (state.state.processed.provider !== 'moneybutton') {
      throw new Error('Incompatible network provider, only moneybutton is supported')
    }

    return {
      // @ts-ignore
      transaction: state.state.processed.payload.rawtx
    }
  }

  const onLoadCallbackForRelayX = (payload: any) => {
  }

  const onErrorCallbackForRelayX = () => {
    
  }

  const onPaymentCallbackForRelayX = (payload: any) => {
    // @ts-ignore
    state.set({
      status: 'broadcasted',
      processed: {
        provider: 'relayx',
        payload,
      },
    })
  }

  const onLoadCallbackForMoneybutton = (payload: any) => {
  }

  const onErrorCallbackForMoneybutton = (payload: any) => {
  }

  const onPaymentCallbackForMoneybutton = (payload: any) => {
    // @ts-ignore
    state.set({
      status: 'broadcasted',
      processed: {
        provider: 'moneybutton',
        payload,
      },
    })
  }

  // @ts-ignore
  const publishBroadcastedTransaction = async (payload) => {
    // @ts-ignore
    api.invoicePost({ invoiceId: state.state.invoiceId }, payload)

    // @ts-ignore
    state.set({
      status: 'broadcasted',
    })
  }

  return ({
    init,
    getPaymentInputForRelayX,
    getPaymentOutputForRelayX,
    getPaymentOutputForMoneybutton,
    getPaymentInputForMoneybutton,
    state: state.state,
    // @ts-ignore
    onLoadCallbackForRelayX,
    // @ts-ignore
    onErrorCallbackForRelayX,
    // @ts-ignore
    onPaymentCallbackForRelayX,
    // @ts-ignore
    onLoadCallbackForMoneybutton,
    // @ts-ignore
    onErrorCallbackForMoneybutton,
    // @ts-ignore
    onPaymentCallbackForMoneybutton,
    publishBroadcastedTransaction,
    getAmountFromSatoshis,
    getCurrencyFromNetwork,
  })
}

export default AnypayService
