import { useState, useRef } from 'react'
import { Forge } from 'txforge'

export type IAnypayService = {
}

export type IAnypayServiceListeners = {
  handleExternalTransactionLoad?: () => void
  handleExternalTransactionError?: () => void
  handleExternalTransactionPayment?: (args: IAnypayServiceHandleExternalTransactionPayment) => void
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
  inputSum: number
  changeTo: string
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

export type IAnypayServiceConfigure = IAnypayServiceListeners & {
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

/**
 * Anypay payment service
 * to setup and create transaction use .configure .setupTransaction
 */
const AnypayService = () : IAnypayServiceResponse => {
  const [state, setState] = useState<IAnypayServiceGetStateResponse>({
    isLoading: true,
    description: '',
    estimateFee: 0,
    outputSum: 0,
    inputSum: 0,
    changeTo: '',
    payment: {},
  })

  const forge = useRef(new Forge())
  
  const listeners = useRef<IAnypayServiceListeners>({
    handleExternalTransactionLoad: () => {},
    handleExternalTransactionError: () => {},
    handleExternalTransactionPayment: () => {},
  })

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
    if (state.isLoading) {
      throw new Error('You must first use .configure AnypayService')
    }

    /**
     * It looks like forge is mutating the inputs and outputs,
     * therefore recreating an object here
     */
    forge.current.addInput(inputs.map(input => Object.assign({}, input)))
    forge.current.addOutput(outputs.map(output => Object.assign({}, output)))

    forge.current.changeTo = changeTo

    setState((state) => ({
      ...state,
      estimateFee: forge.current.estimateFee(),
      outputSum: forge.current.outputSum,
      inputSum: forge.current.inputSum,
      changeTo: forge.current.changeTo,
    }))
  }

  /**
   * 
   */
  const buildTransaction = ({
    keyPair,
  } : IAnypayServiceBuildTransaction) => {
    if (state.isLoading) {
      throw new Error('You must first use .configure AnypayService')
    }
    if (!state.inputSum || !state.changeTo.length) {
      throw new Error('You must first use .setupTransaction AnypayService')
    }

    forge.current.build().sign({ keyPair })
  }

  /**
   * get raw transaction, output of this function could be directly broadcasted on BSV
   */
  const getTransaction = () => {
    return forge.current.tx.toHex()
  }

  /**
   * Configure and Initialize the service
   */
  const configure = ({
    description,
    handleExternalTransactionLoad,
    handleExternalTransactionError,
    handleExternalTransactionPayment,
  } : IAnypayServiceConfigure) => {
    setState((state) => ({ ...state, isLoading: false, description }))

    listeners.current.handleExternalTransactionLoad = handleExternalTransactionLoad
    listeners.current.handleExternalTransactionError = handleExternalTransactionError
    listeners.current.handleExternalTransactionPayment = handleExternalTransactionPayment
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
    if (typeof listeners.current.handleExternalTransactionLoad === 'function') {
      listeners.current.handleExternalTransactionLoad()
    }
  }

  /**
   * Relayx payment provider
   * Callback triggered when an error occurs.
   */
  const handleExternalTransactionError = (...args: any) => {
    if (typeof listeners.current.handleExternalTransactionError === 'function') {
      listeners.current.handleExternalTransactionError()
    }
  }

  /**
   * Relayx payment provider
   * Callback triggered when payment completed.
   */
  const handleExternalTransactionPayment = (payment : IAnypayServiceHandleExternalTransactionPayment) => {
    setState((state) => ({ ...state, payment }))
    if (typeof listeners.current.handleExternalTransactionPayment === 'function') {
      listeners.current.handleExternalTransactionPayment(payment)
    }
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
