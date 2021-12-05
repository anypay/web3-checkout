import * as bsv from 'bsv'
import ApiService from './api'
import StateService from './state'
import type { IStateServiceGetResponse } from './state'

/**
 * Anypay payment service
 */
export type IAnypayService = {
}

export type IAnypayServiceResponse = {
  init: (state: IAnypayServiceInit) => void
  fail: (state: IAnypayServiceFail) => void
  getPaymentInputForRelayX: () => IAnypayServiceGetPaymentInputForRelayXResponse
  getPaymentOutputForRelayX: () => IAnypayServiceGetPaymentOutputForRelayXResponse
  getPaymentInputForMoneybutton: () => IAnypayServiceGetPaymentInputForMoneybuttonResponse
  getPaymentOutputForMoneybutton: () => IAnypayServiceGetPaymentOutputForMoneybuttonResponse
  state: IStateServiceGetResponse

  onLoadCallbackForRelayX: (payload: IAnypayServiceOnLoadCallbackForRelayX) => IAnypayServiceOnLoadCallbackForRelayXResponse
  onErrorCallbackForRelayX: (payload: IAnypayServiceOnErrorCallbackForRelayX) => IAnypayServiceOnErrorCallbackForRelayXResponse
  onPaymentCallbackForRelayX: (payload: IAnypayServiceOnPaymentCallbackForRelayX) => IAnypayServiceOnPaymentCallbackForRelayXResponse

  onLoadCallbackForMoneybutton: (payload: IAnypayServiceOnLoadCallbackForMoneybutton) => IAnypayServiceOnLoadCallbackForMoneybuttonResponse
  onErrorCallbackForMoneybutton: (payload: IAnypayServiceOnErrorCallbackForMoneybutton) => IAnypayServiceOnErrorCallbackForMoneybuttonResponse
  onPaymentCallbackForMoneybutton: (payload: IAnypayServiceOnPaymentCallbackForMoneybutton) => IAnypayServiceOnPaymentCallbackForMoneybuttonResponse

  publishBroadcastedTransaction: (payload: any) => Promise<void>
  getAmountFromSatoshis: (state: number) => number
  getCurrencyFromNetwork: (state: string) => string
}

export type IAnypayServiceInit = {
  invoiceId: string
}

export type IAnypayServiceFail = {
  error: string
}

export type IAnypayServiceGetPaymentInputForRelayXResponse = {
  outputs: {
    to: string
    amount: number
    currency: string
  }[]
}

export type IAnypayServiceGetPaymentOutputForRelayXResponse = {
  transaction: string
}

export type IAnypayServiceGetPaymentInputForMoneybuttonResponse = {
  outputs: {
    to: string
    amount: number
    currency: string
  }[]
}

export type IAnypayServiceGetPaymentOutputForMoneybuttonResponse = {
  transaction: string
}

export type IAnypayServiceOnLoadCallbackForRelayX = any
export type IAnypayServiceOnLoadCallbackForRelayXResponse = void

export type IAnypayServiceOnPaymentCallbackForRelayX = any
export type IAnypayServiceOnPaymentCallbackForRelayXResponse = void

export type IAnypayServiceOnErrorCallbackForRelayX = any
export type IAnypayServiceOnErrorCallbackForRelayXResponse = void

export type IAnypayServiceOnLoadCallbackForMoneybutton = any
export type IAnypayServiceOnLoadCallbackForMoneybuttonResponse = void

export type IAnypayServiceOnPaymentCallbackForMoneybutton = any
export type IAnypayServiceOnPaymentCallbackForMoneybuttonResponse = void

export type IAnypayServiceOnErrorCallbackForMoneybutton = any
export type IAnypayServiceOnErrorCallbackForMoneybuttonResponse = void

const AnypayService = () : IAnypayServiceResponse => {
  const state = StateService()
  const api = ApiService()

  /**
   * Currency abbreviation based on network
   */
  const getCurrencyFromNetwork = (currency: string) => {
    if (currency === 'bitcoin-sv') {
      return 'BSV'
    }

    throw new Error('Uknown currency provided')
  }

  const getAmountFromSatoshis = (amount: number) => {
    return amount / 100000000
  }

  const init = async ({ invoiceId } : IAnypayServiceInit) : Promise<void> => {
    const invoice = await api.invoiceGet({ invoiceId })
    const invoiceReport = await api.invoiceReportGet({ invoiceId })

    state.set({
      initialized: true,
      status: 'pending',
      invoiceId,
      invoiceReport,
      invoice,
    })
  }

  const fail = ({ error } : IAnypayServiceFail) : void => {
    state.set({
      initialized: true,
      status: 'failure',
    })
  }

  const getPaymentInputForRelayX = () : IAnypayServiceGetPaymentInputForRelayXResponse => {
    const networkMapper = (output: { script: string, amount: number }) => ({
      ...output, network: state.state.invoiceReport?.network || '',
    })

    const outputsMapper = (output: { script: string, amount: number, network: string }) => {
      const script = new bsv.Script(output.script)

      return {
        to: script.toASM(),
        amount: getAmountFromSatoshis(output.amount),
        currency: getCurrencyFromNetwork(output.network),
      }
    }

    const outputs = state.state.invoiceReport?.outputs.map(networkMapper).map(outputsMapper) || []

    return {
      outputs,
    }
  }

  const getPaymentOutputForRelayX = () : IAnypayServiceGetPaymentOutputForRelayXResponse => {
    if (state.state.processed?.provider !== 'relayx') {
      throw new Error('Incompatible network provider, only relayx is supported')
    }

    return {
      transaction: state.state.processed.payload.rawTx
    }
  }

  const getPaymentInputForMoneybutton = () : IAnypayServiceGetPaymentInputForMoneybuttonResponse => {
    const networkMapper = (output: { script: string, amount: number }) => ({
      ...output, network: state.state.invoiceReport?.network || '',
    })

    const outputsMapper = (output: { script: string, amount: number, network: string }) => {
      const script = new bsv.Script(output.script)

      return {
        to: script.toASM(),
        amount: getAmountFromSatoshis(output.amount),
        currency: getCurrencyFromNetwork(output.network),
      }
    }

    const outputs = state.state.invoiceReport?.outputs.map(networkMapper).map(outputsMapper) || []

    return {
      outputs,
    }
  }

  const getPaymentOutputForMoneybutton = () : IAnypayServiceGetPaymentOutputForMoneybuttonResponse => {
    if (state.state.processed?.provider !== 'moneybutton') {
      throw new Error('Incompatible network provider, only moneybutton is supported')
    }

    return {
      transaction: state.state.processed.payload.rawtx
    }
  }

  const onLoadCallbackForRelayX = (payload: IAnypayServiceOnLoadCallbackForRelayX) : IAnypayServiceOnLoadCallbackForRelayXResponse => {
    console.log('relayx.onload', payload)
  }

  const onErrorCallbackForRelayX = (payload: IAnypayServiceOnErrorCallbackForRelayX) : IAnypayServiceOnErrorCallbackForRelayXResponse => {
    console.log('relayx.onerror', payload)
  }

  const onPaymentCallbackForRelayX = (payload: IAnypayServiceOnPaymentCallbackForRelayX) : IAnypayServiceOnPaymentCallbackForRelayXResponse => {
    console.log('relayx.onpayment', payload)
    state.set({
      status: 'broadcasted',
      processed: {
        provider: 'relayx',
        payload,
      },
    })
  }

  const onLoadCallbackForMoneybutton = (payload: IAnypayServiceOnLoadCallbackForMoneybutton) : IAnypayServiceOnLoadCallbackForMoneybuttonResponse => {
    console.log('moneybutton.onload', payload)
  }

  const onErrorCallbackForMoneybutton = (payload: IAnypayServiceOnErrorCallbackForMoneybutton) : IAnypayServiceOnErrorCallbackForMoneybuttonResponse => {
    console.log('moneybutton.onerror', payload)
  }

  const onPaymentCallbackForMoneybutton = (payload: IAnypayServiceOnPaymentCallbackForMoneybutton) : IAnypayServiceOnPaymentCallbackForMoneybuttonResponse => {
    console.log('moneybutton.onpayment', payload)
    state.set({
      status: 'broadcasted',
      processed: {
        provider: 'moneybutton',
        payload,
      },
    })
  }

  const publishBroadcastedTransaction = async (payload: any) => {
    if (!state.state.invoiceId) {
      throw new Error('Transaction could not be broadcasted as it wasn\'t initialized')
    }

    api.invoiceReportPost({ invoiceId: state.state.invoiceId }, payload)

    state.set({
      status: 'broadcasted',
    })
  }

  return ({
    state: state.state,
    init,
    fail,
    
    getPaymentInputForRelayX,
    getPaymentOutputForRelayX,
    getPaymentOutputForMoneybutton,
    getPaymentInputForMoneybutton,
    publishBroadcastedTransaction,
    getAmountFromSatoshis,
    getCurrencyFromNetwork,

    onLoadCallbackForRelayX,
    onErrorCallbackForRelayX,
    onPaymentCallbackForRelayX,
    onLoadCallbackForMoneybutton,
    onErrorCallbackForMoneybutton,
    onPaymentCallbackForMoneybutton,
  })
}

export default AnypayService
