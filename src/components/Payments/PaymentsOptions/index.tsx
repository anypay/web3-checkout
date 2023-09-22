
import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import PaymentsOptionsItemButton from './PaymentsOptionsItemButton'
import { useAccordionState } from './service'
import './index.css'

import { baseURL } from 'services/Anypay/api'

import PaymentRelayService from 'services/PaymentRelay'
import PaymentMoneybuttonService from 'services/PaymentMoneybutton'
import { PaymentsComponentContext } from 'components/Payments/context'
//import QRCode from 'react-qr-code'

import Select from 'react-select';

import detectEthereumProvider from '@metamask/detect-provider';

import Web3 from 'web3'

import SolanaWeb3 from '@solana/web3.js'

import { PublicKey, SystemProgram  } from '@solana/web3.js'

type CoinInfo = {
  wallets: string[];
};

type SupportedCoinsArray = {[key: string]: CoinInfo;};

type PaymentWallet = {
  title: string;
  description: string;
  enabled: boolean;
  handler ?: Function;
};

type PaymentWalletArray = {[key: string]: PaymentWallet;};

type SelectorOption = {
  value: string;
  label: string;
  isDisabled: boolean;
};

const ChainIDs = {

}

const ChainTokens = {
  "MATIC": {
    "id": "",
    "USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "USDT": ""
  },
  "AVAX": {
    "id": "",
    "USDC": "",
    "USDT": ""
  },
  "ETH": {
    "id": "",
    "USDC": "",
    "USDT": ""
  },
  "SOL": {
    "id": "",
    "USDC": "",
    "USDT": ""
  }
}

function PaymentsOptionsComponent({ paymentOptions }: any) {
  const anypay = useContext(PaymentsComponentContext)
  const preExpanded = ['payment-relay']
  const accordionState = useAccordionState({ preExpanded })

  const paymentURL = anypay.state.invoice.uri.split("r=")[1]

  const [currencies, setCurrencies] = useState(paymentOptions.map((o:any) => o.currency || o.chain))

  const [bsvOption, setBsvOption] = useState<any>(paymentOptions.find((o:any) => o.chain === 'BSV'))

  const [maticOption, setMaticOption] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'MATIC'))
  const [maticUSDCPaymentRequest, setMaticUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'USDC'))
  const [maticUSDTPaymentRequest, setMaticUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'USDT'))

  const [avalancheOption, setAvalancheOption] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'AVAX'))
  const [avalancheUSDCPaymentRequest, setAvalancheUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'USDC'))
  const [avalancheUSDTPaymentRequest, setAvalancheUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'USDT'))

  const [ethereumOption, setEthereum] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'ETH'))
  const [ethUSDCPaymentRequest, setEthUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'USDC'))
  const [ethUSDTPaymentRequest, setEthUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'USDT'))

  const [solanaOption, setSolanaOption] = useState(paymentOptions.find((o:any) => o.chain === 'SOL')) // TODO: Fix USDC->MATIC for chain

  const [provider, setProvider] = useState<any>(null)
  const [metamaskConnected, setMetamaskConnected] = useState<boolean>(false)
  const [metamaskAccount, setMetamaskAccount] = useState<string | null>(null)

  const [web3, setWeb3] = useState()

  console.log('ETHEREUM OPTION', ethereumOption)

  const networkMap: any = {
    POLYGON_MAINNET: {
      chainId: '0x89',//ethers.toBeHex(137), // '0x89'
      chainName: "Matic(Polygon) Mainnet", 
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://www.polygonscan.com/"],
    },
    ETHEREUM_MAINNET: {
      chainId: '0x1',//ethers.toBeHex(137), // '0x89'
      chainName: "Ethereum Mainnet", 
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
    AVALANCHE_MAINNET: {
      chainId: '0xa86a',//ethers.toBeHex(137), // '0x89'
      chainName: "Avalanche Network C-Chain", 
      nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
      rpcUrls: ["https://avalanche-mainnet.infura.io"],
      blockExplorerUrls: ["https://snowtrace.io/"],
    },
    MUMBAI_TESTNET: {
      chainId: '0x12881',//ethers.toBeHex(80001), // '0x13881'
      chainName: "Matic(Polygon) Mumbai Testnet",
      nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };

  const SPL_TOKENS = {
    'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    'USDT': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
  }  

  const supportedCoins:SupportedCoinsArray = {
    AVAX: { // Avalanche
      wallets: ['BRAVE_WALLET'],
    },
    BCH : { // Bitcoin Cash
      wallets: ['BITCOINCOM_WALLET','EDGE_WALLET'],
    },
    BSV: { // Bitcoin SV
      wallets: ['HAND_CASH', 'RELAYX', 'SENSILET_WALLET', 'TWETCH_WALLET', 'ELECTRUM_SV', 'SENTPE', 'SIMPLY_CASH'],
    },
    BTC: { // Bitcoin
      wallets: ['EDGE', 'BITCOINCOM_WALLET', 'ELECTRUM', 'BREAD_WALLET'],
    },
    DASH: { // Dash
      wallets: ['DASH_WALLET', 'DASH_ELECTRUM', 'DASH_CORE'],
    },
    ETH: { // Ethereum
      wallets: ['BRAVE_WALLET'],
    },
    LTC: { // Litecoin
      wallets: ['EDGE'],
    },
    MATIC: { // Polygon
      wallets: ['BRAVE_WALLET'],
    },
    // SOL: { // Solana
    //   wallets: ['BRAVE_WALLET'],
    // },
    USDC: { // USDC
      wallets: ['BRAVE_WALLET'],
    },
    USDT: { // USDT
      wallets: ['BRAVE_WALLET']
    },
  }

  const supportedWallets: PaymentWalletArray = {
    RELAYX: {
      title: "RELAYX", 
      description: 'Swipe to pay using Relay wallet',
      enabled: false
    },
    HAND_CASH: {
      title: "HAND CASH", 
      description: 'Click to Open Wallet on Mobile',
      enabled: true,
      handler: payWithLink
    },
    SIMPLY_CASH: {
      title: "SIMPLY CASH", 
      description: 'Click to Open Wallet on Mobile',
      enabled: true,
      handler: payWithLink
    },
    ELECTRUM_SV: {
      title: "ELECTRUM SV", 
      description: 'Copy Payment Request URL',
      enabled: true,
      handler: payWithLink
    },
    BRAVE_WALLET: {
      title: "BRAVE WALLET", 
      description: '',
      enabled: true
    },
    BITCOINCOM_WALLET: {
      title: "BITCOINCOM WALLET", 
      description: '',
      enabled: false
    },
    EDGE_WALLET: {
      title: "EDGE WALLET", 
      description: '',
      enabled: false
    },
    SENSILET_WALLET: {
      title: "SENSILET WALLET", 
      description: '',
      enabled: false
    },
    TWETCH_WALLET: {
      title: "TWETCH WALLET", 
      description: '',
      enabled: false
    },
    SENTPE: {
      title: "SENTPE", 
      description: '',
      enabled: false
    },
    EDGE: {
      title: "EDGE", 
      description: '',
      enabled: false
    },
    ELECTRUM: {
      title: "ELECTRUM", 
      description: '',
      enabled: false
    },
    BREAD_WALLET: {
      title: "BREAD WALLET", 
      description: '',
      enabled: false
    },
    DASH_WALLET: {
      title: "DASH WALLET", 
      description: '',
      enabled: true,
      handler: payDashWallet
    },
    DASH_ELECTRUM: {
      title: "DASH ELECTRUM", 
      description: '',
      enabled: true,
      handler: payDashElectrum
    },
    DASH_CORE: {
      title: "DASH CORE", 
      description: '',
      enabled: true,
      handler: payDashCore
    }
  };

  const selectorOptions: SelectorOption[] = Object.keys(supportedCoins)
  .filter((coinTitle: string) => {
    return supportedCoins[coinTitle].wallets
      .some((wallet: string) => supportedWallets[wallet].enabled) && 
      paymentOptions.find((o:any) => o.currency === coinTitle); 
  })
  .map(coinTitle => ({
    value: coinTitle,
    label: coinTitle,
    isDisabled: !supportedCoins[coinTitle].wallets
      .some((wallet: string) => supportedWallets[wallet].enabled)
  })
);

const [defaultSelectorOption] = selectorOptions;

const [selectedCoin, setSelectedCoin] = useState(defaultSelectorOption.value);

  useEffect(() => {

    if (provider) {

      //@ts-ignore
      provider.request({ method: 'eth_requestAccounts' }).then(([account]: string[]) => {

        console.log('ACCOUNT', account)

        setMetamaskAccount(account)

      })

      
    }

  }, [provider])


  /*useEffect(() => {

    if (!metamaskConnected && provider.isConnected()) {
      setMetamaskConnected(true)
    }

  }, [provider])*/

  async function switchMetamaskChain(network: string) {

    return provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkMap[network].chainId }],
    })
    .then((result: any) => {

      console.debug('switchMetamaskChain', result)

    })
    .catch((error: Error) => {
      console.error('switchMetamaskChain.error', error)
    })
  }

  async function ensureChain(network: string) {

    await switchMetamaskChain(network)

  }

  async function payMATICMetamask() {

    let _web3 = new Web3(provider)

    await ensureChain('POLYGON_MAINNET')

    const { address, amount } = maticOption.instructions[0].outputs[0]

    return payETH({address, amount, chain: 'MATIC'})

  }

  async function payAVAXMetamask() {

    let _web3 = new Web3(provider)

    await ensureChain('AVALANCHE_MAINNET')

    const { address, amount } = avalancheOption.instructions[0].outputs[0]

    console.log("PAY AVAX", { address, amount })

    return payETH({address, amount, chain: 'AVAX'})

  }

  async function payETHMetamask() {

    let _web3 = new Web3(provider)

    await ensureChain('ETHEREUM_MAINNET')

    const { address, amount } = ethereumOption.instructions[0].outputs[0]

    console.log("pay eth metamask", { address, amount })

    return payETH({address, amount, chain: 'ETH'})
 
  }

  async function payAvalancheUSDCMetamask() {

    await ensureChain('AVALANCHE_MAINNET')

    const token = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"

    const { address, amount } =  avalancheUSDCPaymentRequest.instructions[0].outputs[0]

    return payUSDC(address, amount, token, 'AVAX', 'USDC')
  }

  async function payAvalancheUSDTMetamask() {

    await ensureChain('AVALANCHE_MAINNET')

    const token = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"

    const { address, amount } =  avalancheUSDTPaymentRequest.instructions[0].outputs[0]

    return payUSDC(address, amount, token, 'AVAX', 'USDT')

  }

  async function payEthereumUSDCMetamask() {

    console.log('payEthereumUSDCMetamask')

    const token = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

    await ensureChain('ETHEREUM_MAINNET')

    const { address, amount } =  ethUSDCPaymentRequest.instructions[0].outputs[0]

    return payUSDC(address, amount, token, 'ETH', 'USDC')
  }

  async function payEthereumUSDTMetamask() {

    const token = "0xdac17f958d2ee523a2206206994597c13d831ec7"

    await ensureChain('ETHEREUM_MAINNET')

    const { address, amount } =  ethUSDTPaymentRequest.instructions[0].outputs[0]

    return payUSDC(address, amount, token, 'ETH', 'USDT')

  }

  const getProvider = () => {
    if ('phantom' in window) {
      //@ts-ignore
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        return provider;
      }
    }
  
    window.open('https://phantom.app/', '_blank');
  };

  async function phantomSolanaPayUSDC() {
    
    const sender = "Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB"

    const provider = getProvider(); // see "Detecting the Provider"
    try {
        const connection = await provider.connect();
        console.log(connection.publicKey.toString());
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 

        //const transaction = new provider.Transaction();

        //const signedTransaction = await provider.signTransaction(transaction);

        //console.log({ signedTransaction })

        // create array of instructions
        /*const instructions = [
          SystemProgram.transfer({
            fromPubkey: new PublicKey(sender),
            toPubkey: new PublicKey("GeKcUd7Ftqhyyvf2zE9JNx5bud5N7QvUBnBQkYWwRnHg"),
            lamports: 10,
          }),
        ];*/


        /*let conn = new SolanaWeb3.Connection(SolanaWeb3.clusterApiUrl("mainnet-beta"));

        console.log(conn)
        */
        
        //const blockhash = await conn.getLatestBlockhash()

        //console.log({ blockhash })

        // create v0 compatible message
        /*const messageV0 = new provider.TransactionMessage({
          payerKey: sender,
          recentBlockhash: blockhash,
          instructions,
        }).compileToV0Message();

        // make a versioned transaction
        const transactionV0 = new provider.VersionedTransaction(messageV0);

        console.log({ transactionV0 })*/


    } catch (err) {

      console.error(err)
        // { code: 4001, message: 'User rejected the request.' }
    }
  }

  async function phantomSolanaPayUSDT() {

    const phantom = getProvider()

  }

  async function payUSDC(address: string, amount: number, token: string, chain: string, currency: string='USDC'): Promise<any> {

    let _web3 = new Web3(provider)

    let tokenAddress = token;

    let toAddress = address;

    let fromAddress = String(metamaskAccount);

    let value = _web3.utils.toBN(amount);

    let minABI: any = [
      // transfer
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "type": "function"
      }
    ];// Get ERC20 Token contract instance
    let contract = new _web3.eth.Contract(minABI, tokenAddress);// calculate ERC20 token amount

    const transfer = contract.methods.transfer(toAddress, value)

    const transferResult = await transfer.call({ from: fromAddress })

    const encoded = transfer.encodeABI()

    const txhex = await _web3.eth.signTransaction({
      from: fromAddress,
      to: tokenAddress,
      data: encoded
    }, provider)

    const url = anypay.state.invoice.uri.split("r=")[1]

    const result = await submitPayment({
      url,
      chain,
      currency,
      txhex: txhex.toString()
    })

  }

  async function payETH({address, amount, chain}: {address: string, amount: number, chain: string}): Promise<void> {

    let _web3 = new Web3(provider)

    let toAddress = address;

    let fromAddress = String(metamaskAccount);

    let value = _web3.utils.toBN(amount);

    console.log(`pay ${chain}`, { amount, value, toAddress, fromAddress })

    const txhex = await _web3.eth.signTransaction({
      from: fromAddress,
      to: toAddress,
      value
    }, provider)

    console.log('eth.accounts.signTransaction.result', txhex)

    const result = await submitPayment({

      chain,

      currency: chain,

      txhex: txhex.toString(),

      url: `${baseURL}r/${anypay.state.invoiceId}`

    })

    console.log({ result })

  }

  async function payPolygonUSDTMetamask() {

    if (!maticUSDTPaymentRequest) { return }


    try {

    await ensureChain('POLYGON_MAINNET')

    const token = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"

    const result = await payUSDC(
      maticUSDTPaymentRequest.instructions[0].outputs[0].address,
      maticUSDTPaymentRequest.instructions[0].outputs[0].amount,
      token,
      "MATIC",
      "USDT"
    )

      console.log('payPolygonUSDTMetamask.result', result)

    } catch(error) {

      console.error('payPolygonUSDTMetamask.error', error)

    }

  }

  async function payMATIC() {

    if (!maticOption) { return }

    try {

      await ensureChain('POLYGON_MAINNET')

      const result = await payETH({
        address: maticOption.instructions[0].outputs[0].address,
        amount: maticOption.instructions[0].outputs[0].amount,
        chain: "MATIC",
      })

      console.log('payPolygonUSDTMetamask.result', result)

    } catch(error) {

      console.error('payPolygonUSDTMetamask.error', error)

    }

  }

  async function payPolygonUSDCMetamask() {

    if (!maticUSDCPaymentRequest) { return }

    try {

      console.log('Pay Polygon USDC Metamask', maticUSDCPaymentRequest)

      await ensureChain('POLYGON_MAINNET')
 
      const result = await payUSDC(
        maticUSDCPaymentRequest.instructions[0].outputs[0].address,
        maticUSDCPaymentRequest.instructions[0].outputs[0].amount,
        "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "MATIC"
      );

      console.log('payPolygonUSDCMetamask.result', result)

    } catch(error) {

      console.error('payPolygonUSDCMetamask.error', error)

    }

  }

  async function payHandCash() {
    window.open(anypay.state.invoice.uri);
  }

  async function payWithLink() {
    window.open(anypay.state.invoice.uri);
  }

  async function payDashWallet() {
    // example link:
    // dash:XmhZcmxTKEfpXYdWEZ5Binc9Aab7LmGK1m?amount=10&currency=USD&local=262.67

    const paymentInfo = anypay.state.invoice.payment_options
      .find((element:any) => element.currency === 'DASH');

    const transactionInfo = paymentInfo.instructions
      .find((element:any) => element.type === 'transaction');

    const address = transactionInfo.outputs[0].address;
    const amount = transactionInfo.outputs[0].amount / Math.pow(10, 8);
    const localAmount = anypay.state.invoice.amount;
    const localCurrency = anypay.state.invoice.currency;
   
    const link = 'dash:' + 
                 address + 
                 '?amount=' + 
                 amount + // currency
                 '&currency=' + 
                 localCurrency + 
                 '&local=' + 
                 localAmount; // usd

    window.open(link);
  }


  async function payDashElectrum() { // need to edit link
    // example link:
    // dash:XuK44Usr44eQ391zeGA1MqsRA4BTYn7xDW?amount=12 

    const paymentInfo = anypay.state.invoice.payment_options
      .find((element:any) => element.currency === 'DASH');

    const transactionInfo = paymentInfo.instructions
      .find((element:any) => element.type === 'transaction');

    const address = transactionInfo.outputs[0].address;
    const amount = transactionInfo.outputs[0].amount / Math.pow(10, 8);
   
    const link = 'dash:' + 
                 address + 
                 '?amount=' + 
                 amount;

    window.open(link);
  }

  async function payDashCore() {
    // example link:
    // dash:XuK44Usr44eQ391zeGA1MqsRA4BTYn7xDW?amount=12 

    const paymentInfo = anypay.state.invoice.payment_options
      .find((element:any) => element.currency === 'DASH');

    const transactionInfo = paymentInfo.instructions
      .find((element:any) => element.type === 'transaction');

    const address = transactionInfo.outputs[0].address;
    const amount = transactionInfo.outputs[0].amount / Math.pow(10, 8);
   
    const link = 'dash:' + 
                 address + 
                 '?amount=' + 
                 amount;

    window.open(link);
  }

  async function getPaymentOption({ url, currency, chain }: {
    url: string,
    currency: string,
    chain: string
  }): Promise<any> {

    const { data } = await axios.post(url, { chain, currency }, {

      headers: {

        'content-type': 'application/payment-request'

      }

    })

  }

  async function submitPayment({ url, txhex, currency, chain }: {
    url: string,
    txhex: string,
    currency: string,
    chain: string
  }): Promise<any> {

    console.log('--submit payment--', {url})

    const { data } = await axios.post(url, {

      chain,

      currency,

      transactions: [{

        tx: txhex

      }]

    }, {

      headers: {

        'content-type': 'application/payment'

      }

    })

    console.log(data, 'submitPayment.response')

  }

  useEffect(() => {

    detectEthereumProvider().then(p => {
      
      setProvider(p)

    })

  }, [])

  useEffect(() => {

    if (!provider) { return }

    const handleChainChanged = (chainId: string) => {

      console.log('metamask.chainChanged', { chainId })

    }

    provider.on('chainChanged', handleChainChanged)

  }, [provider])


  function onCoinSelectorChange (selectedOption: any) {
    setSelectedCoin(selectedOption.value);
  }

  supportedCoins[selectedCoin].wallets
    .sort((a:string, b:string) => supportedWallets[a].enabled && !supportedWallets[b].enabled ? -1 : 1);

  const walletsList = supportedCoins[selectedCoin].wallets.map((walletId: string) => {
      const paymentWallet: PaymentWallet = supportedWallets[walletId];

      if (walletId === 'BRAVE_WALLET') {
        if (selectedCoin === 'USDC') {
          return <>
            {(maticUSDCPaymentRequest && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDC on Polygon with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payPolygonUSDCMetamask}
              />
            )}
            
            {(ethUSDCPaymentRequest && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDC on Ethereum with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payEthereumUSDCMetamask}
              />
            )}

            {(avalancheUSDCPaymentRequest && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDC on Avalanche with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payAvalancheUSDCMetamask}
              />
            )}
          </>
        }

        if (selectedCoin === 'USDT') {
          return <>
            {(maticUSDTPaymentRequest && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDT on Polygon with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payPolygonUSDTMetamask}
              />
            )}

            {(ethUSDTPaymentRequest &&
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDT on ETH with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payEthereumUSDTMetamask}
              />
            )}

            {(avalancheUSDTPaymentRequest &&
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay USDT on Avalanche with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payAvalancheUSDTMetamask}
              />
            )}
          </>
        }

        if (selectedCoin === 'ETH') {
          return <>
            {(ethereumOption &&            
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay ETH with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payETHMetamask}
              />
            )}
          </>
        }

        if (selectedCoin === 'AVAX') {
          return <>
            {(avalancheOption && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay AVAX with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payAVAXMetamask}
              />
            )}
          </>
        }

        if (selectedCoin === 'MATIC') {
          return <>
            {(maticOption && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay MATIC with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payMATICMetamask}
              />
            )}
          </>
        }

        return <></>
      }

      return <>
        <PaymentsOptionsItemButton
          title = {paymentWallet.title}
          subtitle = {paymentWallet.description}
          disabled = {!paymentWallet.enabled}
          handler={paymentWallet.handler}
        />
      </>
  });

  return (
  <>   
    <p>Coins Accepted:<br/><i>{currencies.filter((coinTitle:string, pos: number) => {
      return supportedCoins[coinTitle].wallets
      .some((walletTitle: string) => supportedWallets[walletTitle].enabled) &&
      currencies.indexOf(coinTitle) === pos;
    }).join(', ')}</i></p>

    <Select
      defaultValue={selectorOptions[0]}
      options={selectorOptions}
      onChange={onCoinSelectorChange}
    />
    
    <br/>

    {walletsList}
    
  </>
  )
}

export default PaymentsOptionsComponent
