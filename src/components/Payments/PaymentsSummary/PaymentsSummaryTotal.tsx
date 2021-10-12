import React from 'react'
import styled from 'styled-components'

type IPaymentsSummaryTotalContent = {
}

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
  ${props => props.theme.font.sizeH2}
  ${props => props.theme.font.weight600}
  ${props => props.theme.font.colorDark}
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}
`

function PaymentsSummaryTotalContent({}: IPaymentsSummaryTotalContent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Total</TitleStyled>
        <SubtitleStyled>
          <PriceStyled>Đ 5.3</PriceStyled>
          0.00002653
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryTotalContent
