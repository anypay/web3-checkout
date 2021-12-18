import React from 'react'
import ReceiptSummaryTitleComponent from './ReceiptSummaryTitle'
import ReceiptSummaryInvoiceComponent from './ReceiptSummaryInvoice'
import ReceiptSummaryContentComponent from './ReceiptSummaryContent'
import ReceiptSummaryTotalComponent from './ReceiptSummaryTotal'
import styled from 'styled-components'
import Confetti from 'react-confetti'

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

function ReceiptSummaryComponent() {
  return (
    <WrapperStyled>
      <Confetti recycle={false} />

      <ComponentStyled>
        <ContentStyled>
          <ReceiptSummaryInvoiceComponent />
          <ReceiptSummaryTitleComponent />
          <ReceiptSummaryContentComponent />
          <ReceiptSummaryTotalComponent />
        </ContentStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryComponent
