// Prepaid

// https://api.anypayinc.com/r/zMjwpQ7kk
export const invoiceReportGetPrepaid = {"network":"bitcoin-sv","outputs":[{"script":"76a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac","amount":60800},{"script":"76a914fde8f61612beecbf7532765d17ce9c36c860187888ac","amount":7000}],"creationTimestamp":1638707969,"expirationTimestamp":1638708869,"memo":"Anypay™","paymentUrl":"https://api.anypayinc.com/r/zMjwpQ7kk/pay/BSV/bip270","merchantData":"{\"invoiceUid\":\"zMjwpQ7kk\",\"merchantName\":null,\"avatarUrl\":null}"}

// https://api.anypayinc.com/invoices/zMjwpQ7kk
export const invoiceGetPrepaid = {"invoice":{"amount":0.1,"invoice_amount":null,"invoice_amount_paid":null,"denomination_amount":0.1,"denomination_amount_paid":null,"uid":"zMjwpQ7kk","currency":"USD","email":null,"external_id":null,"business_id":null,"location_id":null,"register_id":null,"cancelled":false,"app_id":null,"secret":null,"item_uid":null,"metadata":null,"headers":{"host":"api.anypayinc.com","x-real-ip":"16.170.33.166","x-forwarded-for":"16.170.33.166","x-forwarded-proto":"https","connection":"upgrade","content-length":"31","sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"","authorization":"Basic ZTU1YzJiZjAtOTYyOS00MzI3LWIwM2EtZjY2NmQ5NTY5ODk3Og==","content-type":"application/json; charset=UTF-8","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36","sec-ch-ua-platform":"\"macOS\"","accept":"*/*","origin":"https://anypayx.com","sec-fetch-site":"cross-site","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"https://anypayx.com/","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9,ru;q=0.8"},"tags":null,"is_public_request":false,"currency_specified":true,"replace_by_fee":false,"expiry":"2021-12-05T12:54:29.383Z","complete":false,"completed_at":null,"redirect_url":null,"invoice_currency":null,"denomination_currency":"USD","address":null,"account_id":19474,"energycity_account_id":null,"access_token":null,"wordpress_site_url":null,"hash":null,"status":"unpaid","locked":false,"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","settledAt":null,"paidAt":null,"createdAt":"2021-12-05T12:39:29.383Z","updatedAt":"2021-12-05T12:39:29.413Z"},"payment_options":[{"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","currency":"BSV","currency_name":"Bitcoin SV","currency_logo_url":"https://anypayinc.s3.amazonaws.com/icons/bsv.png","amount":"0.000608"}],"notes":[],"amount":0.1,"invoice_amount":null,"invoice_amount_paid":null,"denomination_amount":0.1,"denomination_amount_paid":null,"uid":"zMjwpQ7kk","currency":"USD","email":null,"external_id":null,"business_id":null,"location_id":null,"register_id":null,"cancelled":false,"app_id":null,"secret":null,"item_uid":null,"metadata":null,"headers":{"host":"api.anypayinc.com","x-real-ip":"16.170.33.166","x-forwarded-for":"16.170.33.166","x-forwarded-proto":"https","connection":"upgrade","content-length":"31","sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"","authorization":"Basic ZTU1YzJiZjAtOTYyOS00MzI3LWIwM2EtZjY2NmQ5NTY5ODk3Og==","content-type":"application/json; charset=UTF-8","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36","sec-ch-ua-platform":"\"macOS\"","accept":"*/*","origin":"https://anypayx.com","sec-fetch-site":"cross-site","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"https://anypayx.com/","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9,ru;q=0.8"},"tags":null,"is_public_request":false,"currency_specified":true,"replace_by_fee":false,"expiry":"2021-12-05T12:54:29.383Z","complete":false,"completed_at":null,"redirect_url":null,"invoice_currency":null,"denomination_currency":"USD","address":null,"account_id":19474,"energycity_account_id":null,"access_token":null,"wordpress_site_url":null,"hash":null,"status":"unpaid","locked":false,"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","settledAt":null,"paidAt":null,"createdAt":"2021-12-05T12:39:29.383Z","updatedAt":"2021-12-05T12:39:29.413Z"}

export const relayxOnPayment = {
  "txid": "8c316f8d4b733e3d56ddf72504d873d8112863f7f0051cb2744c44e26fb3c2ea",
  "rawTx": "0100000001a420cc3165599f5511fbe4558df3dfb3ac7eb0c7cda5479b2320ec4e51b40582040000006b483045022100c7fcaac5a3c8f4ce8b9002fec3a6b42a83299ef1cbb7bef6b598b5e5cdde298f02206e91a62288d243b00c9de020e1d9def2a3e9a2c3881de052357af01f0a6f8d48412102e8c1da1de96f2d3cd9391d37ec5fd01755c9ae01f212046f1914c32a9b103910ffffffff0480ed0000000000001976a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac581b0000000000001976a914fde8f61612beecbf7532765d17ce9c36c860187888ac00000000000000002f006a2231487948587459577947655072485669736e4e645339333156743643716f7555795a0972656c6179782e696fcdd30000000000001976a9148de288360fe7dea1ea4efded972918b5187d3a8c88ac00000000",
  "amount": 0.0007,
  "satoshis": 67942,
  "currency": "BSV",
  "identity": "0384fff20fe70c83fa4850db5b1fe58af1489be094aaa367b067ae8038948733eb",
  "paymail": "azimgd@relayx.io"
}

export const moneybuttonOnPayment = {
  "id": "8324964",
  "createdAt": "2021-12-05T14:07:09.749Z",
  "updatedAt": "2021-12-05T14:07:10.473Z",
  "deletedAt": null,
  "userId": "56487",
  "txid": "0ec90cd5c33c767af47dece53b478cc2b140d18cb489314ce394df856ca881fd",
  "normalizedTxid": "4224e15883c2cfc43171e94489952284ba67b1e6867d8ef8ba27f1a89c1a0a11",
  "amount": "0.0855",
  "currency": "USD",
  "satoshis": "67800",
  "transactionId": null,
  "status": "RECEIVED",
  "statusDescription": null,
  "clientId": null,
  "buttonId": null,
  "buttonData": null,
  "referrerUrl": "http://localhost:3000/",
  "browserUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36",
  "amountUsd": "0.0855",
  "inputAmountUsd": "1.9259",
  "inputAmountSatoshis": "1526430",
  "spendAmountUsd": "0.0857",
  "spendAmountSatoshis": "67957",
  "feeAmountUsd": "0.0002",
  "feeAmountSatoshis": "157",
  "changeAmountUsd": "1.8401",
  "changeAmountSatoshis": "1458473",
  "rawtx": "0100000001a77636215120cf540086c2b5661e1c37abfc7df6c7559945cf4072309e8e785e020000006b4830450221009cee1815884eb716340c569c30062209306591862229c975dc0ac0cc0b67d93402205f92da7ef8c76a244523853fda7248243f540d98d7877975b59f07d544c5d4e0412102dbf6a2be7a75844176296e8f277182e7319a4a714f8c8aa9612368d92f989676ffffffff03581b0000000000001976a914fde8f61612beecbf7532765d17ce9c36c860187888ac80ed0000000000001976a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac29411600000000001976a9143b7f9de8c0e31a7619724b04f3429c246aa8f49788ac00000000",
  "source": "INTERNAL",
  "cryptoOperations": [],
  "senderSignature": "IGQigGyJ5bMCQyQ63wfkGwVbSgHtzVo+utSgQV9X/iRAaaLn6nFIZByzbcHVeKHazpPP0eyyEiwZiIHuZSPMPnU=",
  "senderPaymail": "56487@moneybutton.com",
  "signaturePubkey": "02762afb93db87f9634d9b3f31cef74777eaf949b3e005ca501b22c91ef677977a",
  "preserveOrder": false,
  "historyCreated": null,
  "isWalletRecovery": false,
  "user": {
    "id": "56487",
    "name": "azimgd",
    "gravatarKey": "50b37131f7eceb10b650a02f2a0c68da",
    "activeHandleId": "135702",
    "activeHandle": {
      "id": "135702",
      "createdAt": "2021-10-19T06:24:12.648Z",
      "updatedAt": "2021-10-19T06:24:12.648Z",
      "deletedAt": null,
      "userId": "56487",
      "localPart": "56487",
      "domain": "moneybutton.com",
      "onSale": false,
      "priceAmount": null,
      "priceCurrency": null
    },
    "defaultCurrency": "USD"
  },
  "paymentOutputs": [{
    "id": "23144893",
    "createdAt": "2021-12-05T14:07:09.767Z",
    "updatedAt": "2021-12-05T14:07:09.767Z",
    "deletedAt": null,
    "paymentId": "8324964",
    "to": "1Q9Z2y3Jhq6xbxD6AU34StgmUjfpbZgxqA",
    "amount": "0.00007",
    "currency": "BSV",
    "satoshis": "7000",
    "type": "ADDRESS",
    "userId": null,
    "address": "1Q9Z2y3Jhq6xbxD6AU34StgmUjfpbZgxqA",
    "script": null,
    "amountUsd": "0.0088",
    "paymailRecipientHandle": null,
    "paymailSenderHandle": null,
    "paymailSenderName": null,
    "paymailPurpose": null,
    "paymailDt": null,
    "paymailPubkey": null,
    "paymailSignature": null,
    "paymailReference": null,
    "assetId": null,
    "assetOptions": null
  }, {
    "id": "23144892",
    "createdAt": "2021-12-05T14:07:09.757Z",
    "updatedAt": "2021-12-05T14:07:09.757Z",
    "deletedAt": null,
    "paymentId": "8324964",
    "to": "1H7JgGPTDQssraNdkBZq4ujRhENAi4KX1Z",
    "amount": "0.000608",
    "currency": "BSV",
    "satoshis": "60800",
    "type": "ADDRESS",
    "userId": null,
    "address": "1H7JgGPTDQssraNdkBZq4ujRhENAi4KX1Z",
    "script": null,
    "amountUsd": "0.0767",
    "paymailRecipientHandle": null,
    "paymailSenderHandle": null,
    "paymailSenderName": null,
    "paymailPurpose": null,
    "paymailDt": null,
    "paymailPubkey": null,
    "paymailSignature": null,
    "paymailReference": null,
    "assetId": null,
    "assetOptions": null
  }]
}

// Postpaid

// https://api.anypayinc.com/r/zMjwpQ7kk
export const invoiceReportGetPostpaid = {"network":"bitcoin-sv","outputs":[{"script":"76a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac","amount":60800},{"script":"76a914fde8f61612beecbf7532765d17ce9c36c860187888ac","amount":7000}],"creationTimestamp":1638707969,"expirationTimestamp":1638708869,"memo":"Anypay™","paymentUrl":"https://api.anypayinc.com/r/zMjwpQ7kk/pay/BSV/bip270","merchantData":"{\"invoiceUid\":\"zMjwpQ7kk\",\"merchantName\":null,\"avatarUrl\":null}"}

// https://api.anypayinc.com/invoices/zMjwpQ7kk
export const invoiceGetPostpaid = {"invoice":{"amount":0.1,"invoice_amount":0.000608,"invoice_amount_paid":0.000608,"denomination_amount":0.1,"denomination_amount_paid":0.1,"uid":"zMjwpQ7kk","currency":"BSV","email":null,"external_id":null,"business_id":null,"location_id":null,"register_id":null,"cancelled":false,"app_id":null,"secret":null,"item_uid":null,"metadata":null,"headers":{"host":"api.anypayinc.com","x-real-ip":"16.170.33.166","x-forwarded-for":"16.170.33.166","x-forwarded-proto":"https","connection":"upgrade","content-length":"31","sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"","authorization":"Basic ZTU1YzJiZjAtOTYyOS00MzI3LWIwM2EtZjY2NmQ5NTY5ODk3Og==","content-type":"application/json; charset=UTF-8","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36","sec-ch-ua-platform":"\"macOS\"","accept":"*/*","origin":"https://anypayx.com","sec-fetch-site":"cross-site","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"https://anypayx.com/","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9,ru;q=0.8"},"tags":null,"is_public_request":false,"currency_specified":true,"replace_by_fee":false,"expiry":"2021-12-05T12:54:29.383Z","complete":true,"completed_at":"2021-12-05T12:52:54.540Z","redirect_url":null,"invoice_currency":"BSV","denomination_currency":"USD","address":"1H7JgGPTDQssraNdkBZq4ujRhENAi4KX1Z","account_id":19474,"energycity_account_id":null,"access_token":null,"wordpress_site_url":null,"hash":"1ab5dc2e9651385c6698dc7f513e68aefcd51b5c8a3f5c9bbc3a68b269ca7451","status":"paid","locked":false,"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","settledAt":null,"paidAt":"2021-12-05T12:52:54.540Z","createdAt":"2021-12-05T12:39:29.383Z","updatedAt":"2021-12-05T12:52:54.540Z"},"payment_options":[{"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","currency":"BSV","currency_name":"Bitcoin SV","currency_logo_url":"https://anypayinc.s3.amazonaws.com/icons/bsv.png","amount":"0.000608"}],"notes":[],"amount":0.1,"invoice_amount":0.000608,"invoice_amount_paid":0.000608,"denomination_amount":0.1,"denomination_amount_paid":0.1,"uid":"zMjwpQ7kk","currency":"BSV","email":null,"external_id":null,"business_id":null,"location_id":null,"register_id":null,"cancelled":false,"app_id":null,"secret":null,"item_uid":null,"metadata":null,"headers":{"host":"api.anypayinc.com","x-real-ip":"16.170.33.166","x-forwarded-for":"16.170.33.166","x-forwarded-proto":"https","connection":"upgrade","content-length":"31","sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"","authorization":"Basic ZTU1YzJiZjAtOTYyOS00MzI3LWIwM2EtZjY2NmQ5NTY5ODk3Og==","content-type":"application/json; charset=UTF-8","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36","sec-ch-ua-platform":"\"macOS\"","accept":"*/*","origin":"https://anypayx.com","sec-fetch-site":"cross-site","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"https://anypayx.com/","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9,ru;q=0.8"},"tags":null,"is_public_request":false,"currency_specified":true,"replace_by_fee":false,"expiry":"2021-12-05T12:54:29.383Z","complete":true,"completed_at":"2021-12-05T12:52:54.540Z","redirect_url":null,"invoice_currency":"BSV","denomination_currency":"USD","address":"1H7JgGPTDQssraNdkBZq4ujRhENAi4KX1Z","account_id":19474,"energycity_account_id":null,"access_token":null,"wordpress_site_url":null,"hash":"1ab5dc2e9651385c6698dc7f513e68aefcd51b5c8a3f5c9bbc3a68b269ca7451","status":"paid","locked":false,"uri":"pay:?r=https://api.anypayinc.com/r/zMjwpQ7kk","settledAt":null,"paidAt":"2021-12-05T12:52:54.540Z","createdAt":"2021-12-05T12:39:29.383Z","updatedAt":"2021-12-05T12:52:54.540Z"}

// https://api.anypayinc.com/r/zMjwpQ7kk/pay/BSV/bip270
export const invoiceReportPost = {"payment":{"transaction":"01000000015174ca69b2683abc9b5c3f8a5c1bd5fcae683e517fdc98665c3851962edcb51a020000006b483045022100b94e13507b2cab4779d476d8644ccf4648e01db75b152347a1ae8827aeef7087022041d3670671f50435abb2f058cb4b742f89ee8002d18e539a08a25336bab332554121025c42df6c775ec772c4554db04e046ce4cfb4ca0f142d7393993264c7da55061cffffffff03581b0000000000001976a914fde8f61612beecbf7532765d17ce9c36c860187888ac80ed0000000000001976a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac9e4a1700000000001976a91476e3160030ef852a22be4c8169bfe92b4a3cbacd88ac00000000"},"memo":"Payment Approved By Anypay®","error":0}
