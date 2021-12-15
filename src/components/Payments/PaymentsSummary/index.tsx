import React from 'react'
import PaymentsSummaryQRComponent from './PaymentsSummaryQR'
import PaymentsSummaryTitleComponent from './PaymentsSummaryTitle'
import PaymentsSummaryContentComponent from './PaymentsSummaryContent'
import PaymentsSummaryTotalComponent from './PaymentsSummaryTotal'
import PaymentsSummaryInfoComponent from './PaymentsSummaryInfo'
import styled from 'styled-components'

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

const SpacingStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

function PaymentsSummaryComponent() {
  return (
    <WrapperStyled>
      <PaymentsSummaryQRComponent />
      <SpacingStyled />

      <ComponentStyled>
        <ContentStyled>
          <PaymentsSummaryTitleComponent />
          <PaymentsSummaryContentComponent />
          <PaymentsSummaryTotalComponent />
        </ContentStyled>
      </ComponentStyled>

      <PaymentsSummaryInfoComponent />
    </WrapperStyled>
  )
}

export default PaymentsSummaryComponent
