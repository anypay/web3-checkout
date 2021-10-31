import '@testing-library/jest-dom'

jest.mock('services/Anypay', () => () => ({
  configure: () => {},
  getState: (() => ({
    isLoading: true,
    description: '',
    estimateFee: 0,
    outputSum: 0,
    inputSum: 0,
    changeTo: '',
    payment: {},
  })),
  setupTransaction: () => {},
  buildTransaction: () => {},
  getTransaction: (() => '123456789'),
  getCoinInSatoshis: (() => 0.000002),

  handleExternalTransactionLoad: () => {},
  handleExternalTransactionError: () => {},
  handleExternalTransactionPayment: () => {},
}))