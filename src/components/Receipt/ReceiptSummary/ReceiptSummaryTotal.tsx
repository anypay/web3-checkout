import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultTop}
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.directionRow}
  ${props => props.theme.flex.alignItemsCenter}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}
`

const PriceStyled = styled.div`
  ${props => props.theme.font.sizeH2}
  ${props => props.theme.font.weight600}
  ${props => props.theme.font.colorDark}
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}
`

function ReceiptSummaryTotalContent() {
  const anypay = useContext(PaymentsComponentContext)

  return (
    <WrapperStyled>
      <ComponentStyled>
        <SubtitleStyled>
          <PriceStyled>{anypay.state.invoice?.currency} {anypay.state.invoice?.invoice_amount}</PriceStyled>
          <PriceStyled>{anypay.state.invoice?.denomination_currency} {anypay.state.invoice?.denomination_amount}</PriceStyled>
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryTotalContent
