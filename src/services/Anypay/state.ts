import { useState } from 'react'
import { AnypayApiResponse } from 'types/api'

export type IStateServiceResponse = {
  set: (state: IStateServiceSet) => IStateServiceSetResponse
  state: IStateServiceGetResponse
}

export type IStateServiceState = {
  initialized?: boolean
  status?: 'pending' | 'broadcasted' | 'published' | 'failure'
  invoiceId?: string,
  invoiceReport?: AnypayApiResponse.InvoiceReportGetResponse
  paymentOptions?: any[]
  invoice?: AnypayApiResponse.InvoiceGetResponse
  processed?: {
    provider: string
    payload: any
  },
  modal?: {
    isOpen: boolean
  },
}

export type IStateServiceSet = (IStateServiceState & {
}) | ((payload: IStateServiceState) => IStateServiceState)

export type IStateServiceSetResponse = void

export type IStateServiceGet = void

export type IStateServiceGetResponse = IStateServiceState

const StateService = () : IStateServiceResponse => {
  const [state, setState] = useState<IStateServiceState>({
    initialized: false,
    status: 'pending',
    paymentOptions: []
  })

  const set = (payload: IStateServiceSet) : IStateServiceSetResponse => {
    if (typeof payload === 'object') {
      setState(state => ({ ...state, ...payload }))
    }

    if (typeof payload === 'function') {
      setState(payload)
    }
  }

  return ({
    set,
    state,
  })
}

export default StateService
