import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

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
`

const SubtitleStyled = styled.div`
  ${props => props.theme.flex.one}
  ${props => props.theme.font.alignEnd}

  ${props => props.theme.font.sizeH3}
  ${props => props.theme.font.colorLink}
  ${props => props.theme.padding.smallLeft}
  ${props => props.theme.font.weight600}
`

function ReceiptSummaryTitleComponent() {
  const anypay = useContext(PaymentsComponentContext)

  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Invoice</TitleStyled>
        <SubtitleStyled>{anypay.state.invoice?.uid}</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryTitleComponent
