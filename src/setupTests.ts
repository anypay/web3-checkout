import '@testing-library/jest-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('https://api.anypayinc.com/r/gO9jGah-o').reply(200, {
  network: 'bitcoin-sv',
  outputs: [
    {'script':'76a914b0b343aa5025eb12f0ff4f63243449df9e4ef22388ac','amount':771200},
    {'script':'76a914fde8f61612beecbf7532765d17ce9c36c860187888ac','amount':6000}
  ],
  creationTimestamp: 1638456312,
  expirationTimestamp: 1638457212,
  memo: 'Anypay™',
  paymentUrl: 'https://api.anypayinc.com/r/JY7s6toFP/pay/BSV/bip270',
  merchantData: '{"invoiceUid":"JY7s6toFP","merchantName":null,"avatarUrl":null}',
});
