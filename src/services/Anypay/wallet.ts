import * as bsv from 'bsv'

export type IGetWallet = {
  privateKeyString: string
}

export type IGetWalletResponse = {
  keyPair: any
  address: any
  outputs: any
  inputs: any
}

export const getWallet = ({ privateKeyString } : IGetWallet) : IGetWalletResponse => {
  const privateKey = bsv.PrivKey.Mainnet.fromString(privateKeyString)
  const keyPair = bsv.KeyPair.fromPrivKey(privateKey)
  const address = bsv.Address.Mainnet.fromPrivKey(privateKey)

  const outputs = [{ to: '1DBz6V6CmvjZTvfjvWpvvwuM1X7GkRmWEq', satoshis: 1000 },]
  const inputs = [{
    address: '185rxHtU6RxDtbERpcnenNXh2mZCs3PVBC',
    txid: '77c20dd74fa4f22db1254c700600f7e76e3d663a58e537ba0d93317a9daa851d',
    vout: 1,
    amount: 0.0498469,
    satoshis: 4984690,
    value: 4984690,
    height: 711180,
    confirmations: 134,
    scriptPubKey: '76a9144db43e454efd2125fc8b500cba8403b580e929ae88ac',
    script: '76a9144db43e454efd2125fc8b500cba8403b580e929ae88ac',
    outputIndex: 1
  }]

  return { keyPair, address, outputs, inputs }
}
