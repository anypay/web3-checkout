export declare module AnypayApiResponse {
  export interface Invoice {
    amount: number;
    uid: string;
    currency: string;
    redirect_url?: any;
    hash?: any;
    status: string;
    uri: string;
    createdAt: Date;
    updatedAt: Date;

    payment_options: PaymentOption[];
    notes: any[];

  }

  export interface PaymentOption {
    uri: string;
    currency: string;
    currency_name: string;
    currency_logo_url: string;
    amount: string;
  }

  export interface InvoiceGetResponse {
    invoice: Invoice;
  }

  export interface Output {
    script: string;
    amount: number;
  }

  export interface GetBIP270InvoiceResponse {
    network: string;
    outputs: Output[];
    creationTimestamp: number;
    expirationTimestamp: number;
    memo: string;
    paymentUrl: string;
    merchantData: string;
  }

  export interface InvoiceReportGetResponse {
    network: string;
    outputs: Output[];
    creationTimestamp: number;
    expirationTimestamp: number;
    memo: string;
    paymentUrl: string;
    merchantData: string;
    paymentOptions: any[];
  }
}
