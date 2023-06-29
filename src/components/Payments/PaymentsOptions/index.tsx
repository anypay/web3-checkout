
import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import { useAccordionState } from './service'
import './index.css'

import { baseURL } from 'services/Anypay/api'

import PaymentRelayService from 'services/PaymentRelay'
import PaymentMoneybuttonService from 'services/PaymentMoneybutton'
import { PaymentsComponentContext } from 'components/Payments/context'
//import QRCode from 'react-qr-code'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import detectEthereumProvider from '@metamask/detect-provider';

import Web3 from 'web3'

import SolanaWeb3 from '@solana/web3.js'

import { PublicKey, SystemProgram  } from '@solana/web3.js'

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

  const [metamaskOption, setMetamaskOption] = useState(false)
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

  return (
    <>
    {(bsvOption || maticOption || metamaskOption) && (
    <Accordion
    onChange={accordionState.setActive}
    allowMultipleExpanded={false}
    allowZeroExpanded={false}
    preExpanded={preExpanded}
  >
    <p>Coins Accepted:<br/><i>{currencies.join(', ')}</i></p>

    {maticOption && (
            
      <AccordionItem uuid="payment-matic-polygon-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="MATIC on Polygon"
              subtitle="Pay MATIC on Polygon Metamask"
              active={accordionState.getActive() === 'payment-matic-polygon-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <div>
              <button onClick={payMATICMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

    )}

    {maticUSDCPaymentRequest && (
      <AccordionItem uuid="payment-usdc-polygon-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDC on Polygon"
              subtitle="Pay USDC on Polygon Metamask"
              active={accordionState.getActive() === 'payment-usdc-polygon-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <div>
              <button onClick={payPolygonUSDCMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    )}
    {maticUSDTPaymentRequest && (

      <AccordionItem uuid="payment-usdt-polygon-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDT Polygon"
              subtitle="Pay USDT on Polygon Metamask"
              active={accordionState.getActive() === 'payment-usdt-polygon-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <div>
            <button onClick={payPolygonUSDTMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    )}

{(false && solanaOption) && (
    <>
            
      <AccordionItem uuid="payment-usdc-solana-phantom">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDC Solana"
              subtitle="Pay USDC on Solana with Phantom Wallet"
              active={accordionState.getActive() === 'payment-usdc-solana-phantom'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
          <button onClick={phantomSolanaPayUSDC} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Phantom</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem uuid="payment-usdt-solana-phantom">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDT Solana"
              subtitle="Pay USDT on Solana with Phantom Wallet"
              active={accordionState.getActive() === 'payment-usdt-solana-phantom'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <button onClick={phantomSolanaPayUSDT} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Phantom</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    </>
    )}

    {(ethUSDCPaymentRequest) && (
            
      <AccordionItem uuid="payment-usdc-ethereum-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDC Ethereum"
              subtitle="Pay USDC ERC20 on Ethereum Metamask"
              active={accordionState.getActive() === 'payment-usdc-ethereum-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>          
            <button onClick={payEthereumUSDCMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    )}

    {(ethereumOption) && (

      <AccordionItem uuid="payment-ethereum-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="ETH on Ethereum"
              subtitle="Pay ETH with Metamask"
              active={accordionState.getActive() === 'payment-ethereum-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
          <button onClick={payETHMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    )}
   
    {(ethUSDTPaymentRequest) && (

      <AccordionItem uuid="payment-usdt-ethereum-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDT Ethereum"
              subtitle="Pay USDT ERC20 on Ethereum Metamask"
              active={accordionState.getActive() === 'payment-usdt-ethereum-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
          <button onClick={payEthereumUSDTMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    )}

  {(avalancheOption) && (

      <AccordionItem uuid="payment-avalanche-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="AVAX on Avalanche"
              subtitle="Pay AVAX on Avalanche Metamask"
              active={accordionState.getActive() === 'payment-avalanche-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <div>
              <button onClick={payAVAXMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
    )}
      
  {(avalancheUSDCPaymentRequest) && (
            
      <AccordionItem uuid="payment-usdc-avalanche-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDC Avalanche"
              subtitle="Pay USDC ERC20 on Avalanche Metamask"
              active={accordionState.getActive() === 'payment-usdc-avalanche-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
          <div>
              <button onClick={payAvalancheUSDCMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

    )}

    {(avalancheUSDTPaymentRequest) && (

      <AccordionItem uuid="payment-usdt-avalanche-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDT Avalanche"
              subtitle="Pay USDT ERC20 on Avalanche Metamask"
              active={accordionState.getActive() === 'payment-usdt-avalanche-metamask'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
          <div>
              <button onClick={payAvalancheUSDTMetamask} style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    )}

    {bsvOption && (
      <>

      {/**
         * Relay
      */}
        <AccordionItem uuid="payment-relay">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="Relay"
              subtitle="Swipe to pay using Relay wallet"
              active={accordionState.getActive() === 'payment-relay'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentRelayService
              paymentOption={bsvOption}

              onLoad={anypay.onLoadCallbackForRelayX}
              onError={anypay.onErrorCallbackForRelayX}
              onPayment={anypay.onPaymentCallbackForRelayX}
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    <AccordionItem uuid="payment-electrum">
      <AccordionItemHeading>
        <AccordionItemButton>
          <PaymentsOptionsItemHeaderComponent
            title="Electrum SV"
            subtitle="Copy Payment Request URL"
            active={accordionState.getActive() === 'payment-electrum'}
          />
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel>
        <PaymentsOptionsItemBodyComponent>
          <small>{anypay.state.invoice.uri}</small>
        </PaymentsOptionsItemBodyComponent>
      </AccordionItemPanel>
    </AccordionItem>

    <AccordionItem uuid="payment-bsv-mobile">
      <AccordionItemHeading>
        <AccordionItemButton>
          <PaymentsOptionsItemHeaderComponent
            title="Handcash or Simply Cash"
            subtitle="Click to Open Wallet on Mobile"
            active={accordionState.getActive() === 'payment-bsv-mobile'}
          />
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel>
        <PaymentsOptionsItemBodyComponent>
          <small><a target="_blank" rel="noreferrer" href={anypay.state.invoice.uri}>{anypay.state.invoice.uri}</a></small>
        </PaymentsOptionsItemBodyComponent>
      </AccordionItemPanel>
    </AccordionItem>

      </>
    )}

  </Accordion>
    )}

    </>
  )
}

export default PaymentsOptionsComponent
