import React from 'react'
import PaymentsSummaryTitleComponent from './PaymentsSummaryTitle'
import PaymentsSummaryContentComponent from './PaymentsSummaryContent'
import PaymentsSummaryTotalComponent from './PaymentsSummaryTotal'
import PaymentsSummaryInfoComponent from './PaymentsSummaryInfo'
import styled from 'styled-components'
import CartService from 'services/Cart'

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
  ${props => props.theme.padding.default}
  ${props => props.theme.background.card}
  ${props => props.theme.border.defaultRadius}
`

const ContentStyled = styled.div`
  ${props => props.theme.padding.small}
`

function PaymentsSummaryComponent() {
  const cart = CartService()

  return (
    <WrapperStyled>
      <ComponentStyled>
        <ContentStyled>
          <PaymentsSummaryTitleComponent cart={cart} />
          <PaymentsSummaryContentComponent cart={cart} />
          <PaymentsSummaryTotalComponent cart={cart} />
        </ContentStyled>
      </ComponentStyled>

      <PaymentsSummaryInfoComponent />
    </WrapperStyled>
  )
}

export default PaymentsSummaryComponent
