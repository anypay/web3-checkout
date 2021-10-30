import { useState } from 'react'
import { Forge } from 'txforge'

export type IAnypayService = {

}

export type IAnypayServiceResponse = {
  configure: (args : IAnypayServiceConfigure) => void
  getState: () => IAnypayServiceGetStateResponse
  setupTransaction: (args : IAnypayServiceSetupTransaction) => void
  buildTransaction: (args : IAnypayServiceBuildTransaction) => void
  getTransaction: () => string
  getCoinInSatoshis: (args: number) => number

  handleExternalTransactionLoad: () => void
  handleExternalTransactionError: () => void
  handleExternalTransactionPayment: (args: IAnypayServiceHandleExternalTransactionPayment) => void
}

export type IAnypayServiceGetStateResponse = {
  isLoading: boolean
  description: string
  estimateFee: number
  outputSum: number
  payment: IAnypayServiceHandleExternalTransactionPayment | {}
}

export type IAnypayServiceConfigureOutputs = {
  satoshis: number
  script?: string
  to?: string
}

export type IAnypayServiceConfigureInputs = {
  address: string
  txid: string
  vout: number
  amount: number
  satoshis: number
  value: number
  height: number
  confirmations: number
  scriptPubKey: string
  script: string
  outputIndex: number
}

export type IAnypayServiceSetupTransaction = {
  inputs: IAnypayServiceConfigureInputs[]
  outputs: IAnypayServiceConfigureOutputs[]
  changeTo: string
}

export type IAnypayServiceBuildTransaction = {
  keyPair: any
}

export type IAnypayServiceConfigure = {
  description: string
}

export type IAnypayServiceConfigureResponse = {
  forge: {
    tx: any
    inputs: any
    outputs: any
    options: any
  }
}

export type IAnypayServiceHandleExternalTransactionPayment = {
  amount: number
  currency: string
  identity: string
  paymail: string
  rawTx: string
  satoshis: number
  txid: string
}

const AnypayService = () : IAnypayServiceResponse => {
  const [state, setState] = useState<IAnypayServiceGetStateResponse>({
    isLoading: true,
    description: '',
    estimateFee: 0,
    outputSum: 0,
    payment: {},
  })

  const forge = new Forge()

  /**
   * Get service state
   */
  const getState = () : IAnypayServiceGetStateResponse => {
    return state
  }

  /**
   * 
   */
  const setupTransaction = ({ inputs, outputs, changeTo } : IAnypayServiceSetupTransaction) => {
    forge.addInput(inputs)
    forge.addOutput(outputs)
    forge.changeTo = changeTo
    setState((state) => ({ ...state, estimateFee: forge.estimateFee(), outputSum: forge.outputSum, inputSum: forge.inputSum }))
  }

  /**
   * 
   */
  const buildTransaction = ({ keyPair } : IAnypayServiceBuildTransaction) => {
    forge.build().sign({ keyPair })
  }

  /**
   * 
   */
  const getTransaction = () => {
    return forge.tx.toHex()
  }

  /**
   * Configure and Initialize the service
   */
  const configure = ({ description } : IAnypayServiceConfigure) => {
    setState((state) => ({ ...state, isLoading: false, description }))
  }

  /**
   * Get satoshi representation in full coin
   */
  const getCoinInSatoshis = (satoshis : number) : number => {
    return satoshis / 100000000
  }

  /**
   * Relayx payment provider
   * Callback triggered when the button is loaded.
   */
  const handleExternalTransactionLoad = (...args: any) => {
  }

  /**
   * Relayx payment provider
   * Callback triggered when an error occurs.
   */
  const handleExternalTransactionError = (...args: any) => {
  }

  /**
   * Relayx payment provider
   * Callback triggered when payment completed.
   */
  const handleExternalTransactionPayment = (payment : IAnypayServiceHandleExternalTransactionPayment) => {
    setState((state) => ({ ...state, payment }))
  }

  return ({
    getState,
    configure,
    setupTransaction,
    buildTransaction,
    getTransaction,
    getCoinInSatoshis,

    handleExternalTransactionLoad,
    handleExternalTransactionError,
    handleExternalTransactionPayment,
  })
}

export default AnypayService
