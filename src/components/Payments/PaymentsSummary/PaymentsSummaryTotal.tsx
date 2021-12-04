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

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
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

function PaymentsSummaryTotalContent() {
  const anypay = useContext(PaymentsComponentContext)
  // @ts-ignore
  const total = anypay.state.invoice.outputs.reduce((acc, item) => acc + item.amount, 0)
  // @ts-ignore
  const network = anypay.state.invoice.network

  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Total</TitleStyled>
        <SubtitleStyled>
          <PriceStyled>{anypay.getCurrencyFromNetwork(network)} {anypay.getAmountFromSatoshis(total)}</PriceStyled>
          {anypay.getAmountFromSatoshis(total)}
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryTotalContent
