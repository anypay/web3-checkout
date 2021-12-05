import axios from 'axios'
import { AnypayApiResponse } from 'types/api'

export type IApiService = {
}

export type IApiServiceResponse = {
  invoiceReportGet: (state: IApiServiceInvoiceGet) => IApiServiceInvoiceGetResponse
  invoiceReportPost: (state: IApiServiceInvoicePost) => IApiServiceInvoicePostResponse
  invoiceGet: (state: IApiServiceStatusGet) => IApiServiceStatusGetResponse
}

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

const ApiService = () => {
  const instance = axios.create({
    baseURL: 'https://api.anypayinc.com/'
  })

  // @ts-ignore
  const invoiceReportGet = async ({ invoiceId }: IApiServiceInvoiceGet) : IApiServiceInvoiceGetResponse => {
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

  return ({
    invoiceReportGet,
    invoiceReportPost,
    invoiceGet,
  })
}

export default ApiService
