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
}

export type IAnypayServiceGetStateResponse = {
  isLoading: boolean
  description: string
}

export type IAnypayServiceConfigureOutputs = {
  satoshis: number
  script: string
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

const AnypayService = () : IAnypayServiceResponse => {
  const [state, setState] = useState<IAnypayServiceGetStateResponse>({
    isLoading: true,
    description: '',
    outputs: [],
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
  const getTransaction = () => forge.tx.toHex()

  /**
   * Configure and Initialize the service
   */
  const configure = ({ description } : IAnypayServiceConfigure) => {
    setState(() => ({ isLoading: false, description }))
  }

  return ({
    getState,
    configure,
    setupTransaction,
    buildTransaction,
    getTransaction,
  })
}

export default AnypayService
