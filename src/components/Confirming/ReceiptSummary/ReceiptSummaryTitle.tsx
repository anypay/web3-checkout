import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'
import dayjs from 'dayjs'

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
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.font.alignEnd}
`

function ReceiptSummaryTitleComponent() {
  const anypay = useContext(PaymentsComponentContext)
  const createdAt = dayjs(anypay.state.invoice?.createdAt).format('D MMMM YYYY')
  const paidAt = dayjs(anypay.state.invoice?.paidAt).format('D MMMM YYYY')

  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Date</TitleStyled>
        {anypay.state.invoice?.status === 'paid' ?
          <SubtitleStyled>{paidAt}</SubtitleStyled>
        : null}
        {anypay.state.invoice?.status !== 'paid' ?
          <SubtitleStyled>{createdAt}</SubtitleStyled>
        : null}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryTitleComponent
