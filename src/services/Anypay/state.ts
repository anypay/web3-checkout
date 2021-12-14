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
  invoice?: AnypayApiResponse.InvoiceGetResponse
  processed?: {
    provider: string
    payload: any
  }
}

export type IStateServiceSet = IStateServiceState & {
}

export type IStateServiceSetResponse = void

export type IStateServiceGet = void

export type IStateServiceGetResponse = IStateServiceState

const StateService = () : IStateServiceResponse => {
  const [state, setState] = useState<IStateServiceState>({
    initialized: false,
    status: 'pending',
  })

  const set = (payload: IStateServiceSet) : IStateServiceSetResponse => {
    setState(state => ({ ...state, ...payload }))
  }

  return ({
    set,
    state,
  })
}

export default StateService
