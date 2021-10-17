import React from 'react'
import styled from 'styled-components'
import type { ICartService } from 'services/Cart'

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
  ${props => props.theme.flex.one}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}
`

const PriceStyled = styled.div`
  overflow: hidden;
  white-space: nowrap;

  ${props => props.theme.font.sizeH2}
  ${props => props.theme.font.weight600}
  ${props => props.theme.font.colorDark}
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}
`

function PaymentsSummaryTotalContent({ cart }: { cart: ICartService }) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Total</TitleStyled>
        <SubtitleStyled>
          <PriceStyled>Đ {cart.getTotalInCrypto(0.00002653).toFixed(8)}</PriceStyled>
          0.00002653
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryTotalContent
