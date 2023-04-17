
import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import PaymentsOptionsItemHeaderComponent from './PaymentsOptionsItemHeader'
import PaymentsOptionsItemBodyComponent from './PaymentsOptionsItemBody'
import { useAccordionState } from './service'
import './index.css'

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
  console.log(anypay.state, 'STATE')
  const preExpanded = ['payment-relay']
  const accordionState = useAccordionState({ preExpanded })

  const [metamaskOption, setMetamaskOption] = useState(false)
  const [bsvOption, setBsvOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'BSV')) // TODO: Fix USDC->MATIC for chain

  const [maticOption, setMaticOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'MATIC' || o.currency === 'USDC'))
  const [maticUSDCPaymentRequest, setMaticUSDCPaymentRequest] = useState<any>()
  const [solanaOption, setSolanaOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'SOL')) // TODO: Fix USDC->MATIC for chain

  const [ethereumOption, setEthereumOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'ETH')) // TODO: Fix USDC->MATIC for chain
  const [avalancheOption, setAvalancheOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'AVAX')) // TODO: Fix USDC->MATIC for chain
  const [phantomOption, setPhantomOption] = useState(false)

  const [provider, setProvider] = useState<any>(null)
  const [metamaskConnected, setMetamaskConnected] = useState<boolean>(false)
  const [metamaskAccount, setMetamaskAccount] = useState<string | null>(null)

  const [web3, setWeb3] = useState()

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

    /*provider.request({
      method: 'wallet_addEthereumChain',
      params: [networkMap[network]]
    })
    .then(() => {*/

      return provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkMap[network].chainId }],
      })

    //})
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

  async function payPolygonUSDTMetamask() {

    await ensureChain('POLYGON_MAINNET')

    const token = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"

    const result = await payUSDC("0x78291d2aD33BB8577c53929961c38bc1Adc66Ee8", 1, token)

    console.log('metamask.ethereum.usdt.send.result', result)
  }

  async function payAvalancheUSDCMetamask() {

    await ensureChain('AVALANCHE_MAINNET')

    const token = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"

    const result = await payUSDC("0xA77547a3fB82a5Fa4DB408144870B69c70906989", 1, token)

    console.log('metamask.ethereum.usdt.send.result', result)
  }

  async function payAvalancheUSDTMetamask() {

    await ensureChain('AVALANCHE_MAINNET')

    const token = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"

    const result = await payUSDC("0xA77547a3fB82a5Fa4DB408144870B69c70906989", 1, token)

    console.log('metamask.ethereum.usdt.send.result', result)
  }

  async function payEthereumUSDCMetamask() {

    console.log('payEthereumUSDCMetamask')

    const token = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

    await ensureChain('ETHEREUM_MAINNET')

    const result = await payUSDC("0xA77547a3fB82a5Fa4DB408144870B69c70906989", 1, token)

    console.log('pay ethereum usdc metamask')

    console.log('metamask.ethereum.usdc.send.result', result)
  }

  async function payEthereumUSDTMetamask() {

    const token = "0xdac17f958d2ee523a2206206994597c13d831ec7"

    await ensureChain('ETHEREUM_MAINNET')

    const result = await payUSDC("0xA77547a3fB82a5Fa4DB408144870B69c70906989", 1, token)

    console.log('metamask.ethereum.usdt.send.result', result)

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

  async function payUSDC(address: string, amount: any, token: string): Promise<any> {

    let _web3 = new Web3(provider)


    let tokenAddress = token;
    let toAddress = address;
    let fromAddress = metamaskAccount;// Use BigNumber
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
    return contract.methods.transfer(toAddress, value).send({from: fromAddress})
    .on('transactionHash', function(hash: string){
      console.log('transactionHash', hash);

      return hash
    })
    .on('sending', (payload: any) => {
      console.log('metamask.sending', payload)
    })
    .on('sent', (payload: any) => {
      console.log('metamask.sent', payload)
    })
    .on('receipt', (payload: any) => {
      console.log('metamask.receipt', payload)
    })
    .on('confirmation', (payload: any) => {
      console.log('metamask.confirmation', payload)
    })
    .on('error', (payload: any) => {
      console.log('metamask.error', payload)
    })
    .catch((error: Error) => {

      console.error('metamask.send.error', error)
    })
  }

  async function payPolygonUSDCMetamask() {

    if (!maticUSDCPaymentRequest) { return }

    try {

      console.log('Pay Polygon USDC Metamask', maticUSDCPaymentRequest)

      await ensureChain('POLYGON_MAINNET')
 
      const result = await payUSDC(
        maticUSDCPaymentRequest.instructions[0].outputs[0].address,
        maticUSDCPaymentRequest.instructions[0].outputs[0].amount,
        "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
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

    if (chain === 'MATIC' && currency === 'USDC') {

      console.log(data, 'MATIC USDC Payment Request')

      setMaticUSDCPaymentRequest(data)

    }

  }

  useEffect(() => {

    getPaymentOption({ 
      url: `https://api.next.anypayx.com/i/${anypay.state.invoiceId}`,
      chain: 'MATIC',
      currency: 'USDC'
    })

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
    {(bsvOption || maticOption || metamaskOption || phantomOption) && (
    <Accordion
    onChange={accordionState.setActive}
    allowMultipleExpanded={false}
    allowZeroExpanded={false}
    preExpanded={preExpanded}
  >
    {maticOption && maticUSDCPaymentRequest && (
    <>
            
      <AccordionItem uuid="payment-usdc-polygon-metamask">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="USDC Polygon"
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

      {/*
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
      */}

    </>
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

{(ethereumOption) && (
    <>
            
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
      
    </>
    )}

{(avalancheOption) && (
    <>
            
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
      
    </>
    )}
    {bsvOption && (
      <>

      {/**
         * Relay
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
              outputs={anypay.getPaymentInputForRelayX().outputs}

              onLoad={anypay.onLoadCallbackForRelayX}
              onError={anypay.onErrorCallbackForRelayX}
              onPayment={anypay.onPaymentCallbackForRelayX}
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
         */}
      
      {/**
       * Money Button
      <AccordionItem uuid="payment-moneybutton">
        <AccordionItemHeading>
          <AccordionItemButton>
            <PaymentsOptionsItemHeaderComponent
              title="MoneyButton"
              subtitle="Swipe to pay using MoneyButton"
              active={accordionState.getActive() === 'payment-moneybutton'}
            />
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <PaymentsOptionsItemBodyComponent>
            <PaymentMoneybuttonService
              outputs={anypay.getPaymentInputForMoneybutton().outputs}

              onLoad={anypay.onLoadCallbackForMoneybutton}
              onError={anypay.onErrorCallbackForMoneybutton}
              onPayment={anypay.onPaymentCallbackForMoneybutton}
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
          <small>pay:?r=https://anypayx.com/r/${anypay.state.invoiceId}</small>
        </PaymentsOptionsItemBodyComponent>
      </AccordionItemPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
        <PaymentsOptionsItemHeaderComponent
            title="Electrum SV"
            subtitle="Copy Payment Request URL"
            active={accordionState.getActive() === 'payment-usdc-metamask'}
          />
        </AccordionItemButton>
      </AccordionItemHeading>
    </AccordionItem>
       */}
      </>
    )}

  </Accordion>
    )}

    </>
  )
}

export default PaymentsOptionsComponent
