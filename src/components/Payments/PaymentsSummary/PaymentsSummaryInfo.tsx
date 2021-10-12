import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.directionRow}
  ${props => props.theme.flex.alignItemsCenter}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.font.alignCenter}
`

function PaymentsSummaryInfoComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <SubtitleStyled>Wallets use their own live price data and DUR values may differ slightly.</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryInfoComponent
