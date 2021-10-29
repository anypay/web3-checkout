import { useState } from 'react'

export type IAnypayService = {

}

export type IAnypayServiceResponse = {
  configure: (args : IAnypayServiceConfigure) => void
  getState: () => IAnypayServiceGetStateResponse
}

export type IAnypayServiceGetStateResponse = {
  isLoading: boolean
  description: string
  outputs: IAnypayServiceConfigureOutputs[]
}

export type IAnypayServiceConfigureOutputs = {
  satoshis: number
  script: string
}

export type IAnypayServiceConfigure = {
  description: string
  outputs: IAnypayServiceConfigureOutputs[]
}

const AnypayService = () : IAnypayServiceResponse => {
  const [state, setState] = useState<IAnypayServiceGetStateResponse>({
    isLoading: true,
    description: '',
    outputs: [],
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
  const setup = () => {
    
  }

  /**
   * Configure and Initialize the service
   */
  const configure = ({ description, outputs } : IAnypayServiceConfigure) => {
    setState(() => ({ isLoading: false, description, outputs }))
  }

  return ({
    getState,
    configure,
  })
}

export default AnypayService
