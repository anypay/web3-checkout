export declare module AnypayApiResponse {
  export interface Invoice {
    amount: number;
    invoice_amount?: any;
    invoice_amount_paid?: any;
    denomination_amount: number;
    denomination_amount_paid?: any;
    uid: string;
    currency: string;
    email?: any;
    external_id?: any;
    business_id?: any;
    location_id?: any;
    register_id?: any;
    cancelled: boolean;
    app_id?: any;
    secret?: any;
    item_uid?: any;
    metadata?: any;
    headers: any;
    tags?: any;
    is_public_request: boolean;
    currency_specified: boolean;
    replace_by_fee: boolean;
    expiry: Date;
    complete: boolean;
    completed_at?: any;
    redirect_url?: any;
    invoice_currency?: any;
    denomination_currency: string;
    address?: any;
    account_id: number;
    energycity_account_id?: any;
    access_token?: any;
    wordpress_site_url?: any;
    hash?: any;
    status: string;
    locked: boolean;
    uri: string;
    settledAt?: any;
    paidAt?: any;
    createdAt: Date;
    updatedAt: Date;
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
    payment_options: PaymentOption[];
    notes: any[];
    amount: number;
    invoice_amount?: any;
    invoice_amount_paid?: any;
    denomination_amount: number;
    denomination_amount_paid?: any;
    uid: string;
    currency: string;
    email?: any;
    external_id?: any;
    business_id?: any;
    location_id?: any;
    register_id?: any;
    cancelled: boolean;
    app_id?: any;
    secret?: any;
    item_uid?: any;
    metadata?: any;
    headers: any;
    tags?: any;
    is_public_request: boolean;
    currency_specified: boolean;
    replace_by_fee: boolean;
    expiry: Date;
    complete: boolean;
    completed_at?: any;
    redirect_url?: any;
    invoice_currency?: any;
    denomination_currency: string;
    address?: any;
    account_id: number;
    energycity_account_id?: any;
    access_token?: any;
    wordpress_site_url?: any;
    hash?: any;
    status: string;
    locked: boolean;
    uri: string;
    settledAt?: any;
    paidAt?: any;
    createdAt: Date;
    updatedAt: Date;
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