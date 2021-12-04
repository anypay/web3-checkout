import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.smallVertical}
`

const ComponentStyled = styled.div`
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH3}
  ${props => props.theme.font.weight600}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
`

function PaymentsSummaryContentContent() {
  const anypay = useContext(PaymentsComponentContext)
  // @ts-ignore
  const memo = anypay.state.invoice.memo

  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Memo</TitleStyled>
        <SubtitleStyled>{memo}</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryContentContent
