import React, { useState } from 'react'
import PaymentsHeaderComponent from 'components/Payments/PaymentsHeader'
import PaymentsOptionsComponent from 'components/Payments/PaymentsOptions'
import PaymentsSummaryComponent from 'components/Payments/PaymentsSummary'
import styled from 'styled-components'
import { generateMedia } from 'styled-media-query'

const media = generateMedia({
  medium: '40rem',
})

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const HeaderStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
  ${media.greaterThan('medium')`
    padding-bottom: 3rem;
  `}
`

const MainStyled = styled.div`
  ${media.greaterThan('medium')`
    ${props => props.theme.flex.directionRow}
  `}

  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
  `}
`

const ContentStyled = styled.div`
  ${media.greaterThan('medium')`
    width: 60%;
    ${props => props.theme.padding.smallRight}
  `}

  ${media.lessThan('medium')`
    order: 2;
  `}
`

const SidebarStyled = styled.div`
  ${media.greaterThan('medium')`
    width: 40%;
    ${props => props.theme.padding.smallLeft}
  `}

  ${media.lessThan('medium')`
    order: 1;
  `}
`

function PaymentsComponent({paymentOptions}: any) {

  console.log("--options--", paymentOptions)


  const [showWebPaymentOptions, setShowWebPaymentOptions] = useState<boolean>(false)

  if (paymentOptions.find((o: any) => o.chain === 'BSV')) {
    if (!showWebPaymentOptions) {
      setShowWebPaymentOptions(true)  
    }
  }

  if (paymentOptions.find((o: any) => o.chain === 'MATIC' || o.chain === 'USDC')) {
    if (!showWebPaymentOptions) {
      setShowWebPaymentOptions(true)  
    }
  }

  return (
    <WrapperStyled>
      <ComponentStyled>
        <HeaderStyled>
          <PaymentsHeaderComponent />
        </HeaderStyled>

        {showWebPaymentOptions ? (
        <MainStyled>
        <ContentStyled>
          <PaymentsOptionsComponent paymentOptions={paymentOptions} />
        </ContentStyled>

        <SidebarStyled>
          <PaymentsSummaryComponent />
        </SidebarStyled>
      </MainStyled>
        ) : (
            <PaymentsSummaryComponent/>
        )}


      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsComponent
