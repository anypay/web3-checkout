import axios from 'axios'
import { useState } from 'react'

export type IApiService = {
}

export type IApiServiceResponse = {
  invoiceGet: (state: IApiServiceGet) => IApiServiceGetResponse
}

export type IApiServiceGet = {
  invoiceId: string
}

export type IApiServiceGetResponse = Promise<{
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

  return ({
    invoiceGet,
  })
}

/**
 * 
 */
export type IStateService = {
}

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
  get: () => IStateServiceGetResponse
}

export type IStateServiceState = {
  initialized: boolean
  invoice: IInvoiceResponse | {}
}

export type IStateServiceSet = IStateServiceState & {
}

export type IStateServiceSetResponse = void

export type IStateServiceGet = void

export type IStateServiceGetResponse = IStateService & {
}

const State = () : IStateServiceResponse => {
  const [state, setState] = useState<IStateServiceState>({
    initialized: false,
    invoice: {},
  })

  const set = (payload: IStateServiceSet) : IStateServiceSetResponse => {
    setState(payload)
  }

  const get = () : IStateServiceGetResponse => {
    return state
  }

  return ({
    set,
    get,
  })
}

/**
 * Anypay payment service
 */
export type IAnypayService = {
}

export type IAnypayServiceResponse = {
  init: (state: IAnypayServiceInit) => IAnypayServiceInitResponse
  state: () => IAnypayServiceInitResponse
}

export type IAnypayServiceInit = IApiServiceGet & {
}

export type IAnypayServiceInitResponse = void

const AnypayService = () : IAnypayServiceResponse => {
  const state = State()
  const api = Api()

  // @ts-ignore
  const init = async ({ invoiceId } : IAnypayServiceInit) : IAnypayServiceInitResponse => {
    const invoice = await api.invoiceGet({ invoiceId })

    state.set({
      initialized: true,
      invoice,
    })
  }

  return ({
    init,
    state: () => {
      return state.get()
    },
  })
}

export default AnypayService
