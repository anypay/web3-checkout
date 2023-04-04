import axios from 'axios'
import { AnypayApiResponse } from 'types/api'

export type IApiService = {
}

export type IApiServiceResponse = {
  pay: (state: IApiServiceInvoiceGet) => IApiServiceInvoiceGetResponse
  invoiceReportGet: (state: IApiServiceInvoiceGet) => IApiServiceInvoiceGetResponse
  paymentOptionsGet: (state: IApiServiceInvoiceGet) => IApiServicePaymentOptionsGetResponse
  invoiceCreatePost: (state: IApiServiceInvoiceGet) => IApiServiceInvoiceGetResponse
  invoiceReportPost: (state: IApiServiceInvoicePost) => IApiServiceInvoicePostResponse
  invoiceGet: (state: IApiServiceStatusGet) => IApiServiceStatusGetResponse
  invoicePoll: (state: IApiServiceStatusPoll) => IApiServiceStatusPollResponse
}

export type IIApiServiceCreatePost = {
  payload: {
    amount: number
    business_id?: string
    location_id?: string
    register_id?: string
    redirect_url?: string
    webhook_url?: string
    external_id?: string
  }
}

export type IApiServicePaymentOptionsGetResponse = Promise<any>

export type IIApiServiceCreatePostResponse = Promise<AnypayApiResponse.InvoiceReportGetResponse>

export type IApiServiceInvoiceGet = {
  invoiceId: string
}

export type IApiServiceInvoiceGetResponse = Promise<AnypayApiResponse.InvoiceReportGetResponse>

export type IApiServiceInvoicePost = {
  invoiceId: string
}

export type IApiServiceInvoicePostResponse = Promise<{
}>

export type IApiServiceStatusGet = {
  invoiceId: string
}

export type IApiServiceStatusGetResponse = Promise<AnypayApiResponse.InvoiceGetResponse>

export type IApiServicePaymentOptionsResponse = Promise<any>

export type IApiServiceStatusPoll = {
  invoiceId: string
  callback: (payload: any) => void
}

export type IApiServiceStatusPollResponse = NodeJS.Timer

const MERCHANT_API_KEY = '43b5f322-4eb7-487d-b8ba-3a0fbfe3235b'

const ApiService = () => {
  const instance = axios.create({
    baseURL: 'https://api.anypayx.com/'
  })

  // @ts-ignore
  const invoiceCreatePost = async ({ payload }: IApiServiceCreatePost) : IApiServiceCreatePostResponse => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(`${MERCHANT_API_KEY}:`)}`
      }
    }
    const request = await instance.post(`/invoices`, payload, options)
    return request.data
  }

  // @ts-ignore
  const invoiceReportGet = async ({ invoiceId }: IApiServiceInvoiceGet) : IApiServiceInvoiceGetResponse => {
    const request = await instance.get(`/r/${invoiceId}`)
    return request.data
  }

  // @ts-ignore
  const paymentOptionsGet = async ({ invoiceId }: IApiServicePaymentOptionsGet) : IApiServicePaymentOptionsGetResponse => {
    const request = await instance.get(`/r/${invoiceId}`)
    return request.data
  }

  // @ts-ignore
  const invoiceReportPost = async ({ invoiceId }: IApiServiceInvoicePost, payload) : IApiServiceInvoicePostResponse => {
    const request = await instance.post(`/r/${invoiceId}/pay/BSV/bip270`, payload)
    return request.data
  }


  // @ts-ignore
  const invoiceGet = async ({ invoiceId }: IApiServiceStatusGet) : IApiServiceStatusGetResponse => {
    const request = await instance.get(`/invoices/${invoiceId}`)
    return request.data
  }

  // @ts-ignore
  const invoiceGetPoll = ({ invoiceId, callback }: IApiServiceStatusPoll) : IApiServiceStatusPollResponse => {
    const interval = setInterval(async () => {
      const invoice = await invoiceGet({ invoiceId })
      callback(invoice)
    }, 2000)

    return interval
  }

  return ({
    invoiceReportGet,
    invoiceCreatePost,
    invoiceReportPost,
    invoiceGet,
    invoiceGetPoll,
  })
}

export default ApiService
