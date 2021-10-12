import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.directionRow}
  ${props => props.theme.flex.alignItemsCenter}
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH3}
  ${props => props.theme.font.weight600}
  ${props => props.theme.flex.one}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
`

function PaymentsSummaryTitleComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Invoice</TitleStyled>
        <SubtitleStyled>12 October 2021</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryTitleComponent
