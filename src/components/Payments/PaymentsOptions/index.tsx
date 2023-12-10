
import axios from 'axios'

import { useContext, useEffect, useState } from 'react'
import PaymentsOptionsItemButton from './PaymentsOptionsItemButton'
import './index.css'

import { baseURL } from 'services/Anypay/api'

import { PaymentsComponentContext } from 'components/Payments/context'

import Select from 'react-select';

import detectEthereumProvider from '@metamask/detect-provider';

import { Web3 } from 'web3';


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

function PaymentsOptionsComponent({ paymentOptions }: any) {
  const anypay = useContext(PaymentsComponentContext)

  const [currencies] = useState(paymentOptions.map((o:any) => o.currency || o.chain))

  const [maticOption] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'MATIC'))
  const [maticUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'USDC'))
  const [maticUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'MATIC' && o.currency === 'USDT'))

  const [avalancheOption] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'AVAX'))
  const [avalancheUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'USDC'))
  const [avalancheUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'AVAX' && o.currency === 'USDT'))

  const [ethereumOption] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'ETH'))
  const [ethUSDCPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'USDC'))
  const [ethUSDTPaymentRequest] = useState(paymentOptions.find((o:any) => o.chain === 'ETH' && o.currency === 'USDT'))

  const [provider, setProvider] = useState<any>(null)
  const [metamaskAccount, setMetamaskAccount] = useState<string | null>(null)

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

      }).catch(console.error)

      
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

    await ensureChain('POLYGON_MAINNET')

    const { address, amount } = maticOption.instructions[0].outputs[0]

    return payETH({address, amount, chain: 'MATIC'})

  }

  async function payAVAXMetamask() {

    await ensureChain('AVALANCHE_MAINNET')

    const { address, amount } = avalancheOption.instructions[0].outputs[0]

    return payETH({address, amount, chain: 'AVAX'})

  }

  async function payETHMetamask() {

    await ensureChain('ETHEREUM_MAINNET')

    const { address, amount } = ethereumOption.instructions[0].outputs[0]

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

  async function payUSDC(address: string, amount: number, token: string, chain: string, currency: string='USDC'): Promise<any> {

    const _web3 = new Web3(provider)

    const tokenAddress = token;

    const toAddress = address;

    const fromAddress = String(metamaskAccount);

    const value = _web3.utils.toNumber(amount);

    const minABI: any = [
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
    const contract = new _web3.eth.Contract(minABI, tokenAddress);// calculate ERC20 token amount

    const transfer = (contract.methods.transfer as any)(toAddress, value)

    await transfer.call({ from: fromAddress })

    const encoded = transfer.encodeABI()

    const txhex = await _web3.eth.signTransaction({
      from: fromAddress,
      to: tokenAddress,
      data: encoded
    }, provider)

    const url = anypay.state.invoice.uri.split("r=")[1]

    return submitPayment({
      url,
      chain,
      currency,
      txhex: txhex.toString()
    })

  }

  async function payETH({address, amount, chain}: {address: string, amount: number, chain: string}): Promise<void> {

    const _web3 = new Web3(provider)

    const toAddress = address;

    const fromAddress = String(metamaskAccount);

    const value = _web3.utils.toNumber(amount);

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
          return <div key={walletId + 'USDC'}>
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
          </div>
        }

        if (selectedCoin === 'USDT') {
          return <div key={walletId + 'USDT'}>
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
          </div>
        }

        if (selectedCoin === 'ETH') {
          return <div key={walletId + 'ETH'}>
            {(ethereumOption &&            
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay ETH with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payETHMetamask}
              />
            )}
          </div>
        }

        if (selectedCoin === 'AVAX') {
          return <div key={walletId + 'AVAX'}>
            {(avalancheOption && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay AVAX with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payAVAXMetamask}
              />
            )}
          </div>
        }

        if (selectedCoin === 'MATIC') {
          return <div key={walletId + 'MATIC'}>
            {(maticOption && 
              <PaymentsOptionsItemButton
                title = {paymentWallet.title}
                subtitle = {'Pay MATIC with Brave Wallet'}
                disabled = {!paymentWallet.enabled}
                handler={payMATICMetamask}
              />
            )}
          </div>
        }

        return <></>
      }

      return <div key={walletId}>
        <PaymentsOptionsItemButton
          title = {paymentWallet.title}
          subtitle = {paymentWallet.description}
          disabled = {!paymentWallet.enabled}
          handler={paymentWallet.handler}
        />
      </div>
  });

  return (
  <>   
    <p>Coins Accepted:<br/><i>{currencies.filter((coinTitle:string, pos: number) => {
      return supportedCoins[coinTitle] === undefined ? false : supportedCoins[coinTitle].wallets
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
