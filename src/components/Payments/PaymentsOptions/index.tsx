import React, { useContext, useState } from 'react'
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

function PaymentsOptionsComponent({ paymentOptions }: any) {
  const anypay = useContext(PaymentsComponentContext)
  const preExpanded = ['payment-relay']
  const accordionState = useAccordionState({ preExpanded })

  const [metamaskOption, setMetamaskOption] = useState(false)
  const [bsvOption, setBsvOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'BSV')) // TODO: Fix USDC->MATIC for chain

  const [maticOption, setMaticOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'MATIC' || o.chain === 'USDC')) // TODO: Fix USDC->MATIC for chain
  const [solanaOption, setSolanaOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'SOL')) // TODO: Fix USDC->MATIC for chain

  const [ethereumOption, setEthereumOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'ETH')) // TODO: Fix USDC->MATIC for chain
  const [avalancheOption, setAvalancheOption] = useState(!!paymentOptions.find((o:any) => o.chain === 'AVAX')) // TODO: Fix USDC->MATIC for chain
  const [phantomOption, setPhantomOption] = useState(false)

  console.log('MATIC OPTION', maticOption)

  return (
    <>
    {(bsvOption || maticOption || metamaskOption || phantomOption) && (
    <Accordion
    onChange={accordionState.setActive}
    allowMultipleExpanded={false}
    allowZeroExpanded={false}
    preExpanded={preExpanded}
  >
    {maticOption && (
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
              <button style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
              <button style={{padding:'1em', backgroundColor: '#388EF1', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Wallet Bot</button>          
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

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
            <button style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Metamask</button>
            <button style={{padding:'1em', backgroundColor: '#388EF1', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Wallet Bot</button>          
            </div>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>

    </>
    )}

{solanaOption && (
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
            <button style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Open Phantom Wallet</button>
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
            <button style={{padding:'1em', backgroundColor: '#832E9B', color: 'white', fontWeight: 'bold', borderRadius: '1em', border: '0px' }}>Open Phantom Wallet</button>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    </>
    )}

{ethereumOption && (
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
            <></>
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
            <></>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    </>
    )}

{avalancheOption && (
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
            <></>
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
            <></>
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
    </>
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
              outputs={anypay.getPaymentInputForRelayX().outputs}

              onLoad={anypay.onLoadCallbackForRelayX}
              onError={anypay.onErrorCallbackForRelayX}
              onPayment={anypay.onPaymentCallbackForRelayX}
            />
          </PaymentsOptionsItemBodyComponent>
        </AccordionItemPanel>
      </AccordionItem>
      
      {/**
       * Relay
       */}
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


    {/**
     * HandCash
     */}
    <AccordionItem uuid="payment-handcash">
      <AccordionItemHeading>
        <AccordionItemButton>
          <PaymentsOptionsItemHeaderComponent
            title="HandCash & Simply Cash"
            subtitle="Click to open wallet app"
            active={accordionState.getActive() === 'payment-handcash'}
          />
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel>

        <PaymentsOptionsItemBodyComponent>
      {/* eslint-disable-next-line */}
        <h3>< a target="_blank" rel="noreferrer" href="`pay:?r=https://api.anypayinc.com/r/${anypay.state.invoiceId}`">Scan QR to Pay</a></h3>
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
      </>
    )}

  </Accordion>
    )}

    </>
  )
}

export default PaymentsOptionsComponent
