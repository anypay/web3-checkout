import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.smallVertical}
`

const ComponentStyled = styled.div`
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

function PaymentsSummaryContentContent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Memo</TitleStyled>
        <SubtitleStyled>Paypresto graffiti demo</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryContentContent
