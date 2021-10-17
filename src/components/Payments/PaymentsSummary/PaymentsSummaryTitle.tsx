import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import type { ICartService } from 'services/Cart'

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

function PaymentsSummaryTitleComponent({ cart }: { cart: ICartService }) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>Invoice</TitleStyled>
        <SubtitleStyled>{dayjs(cart.get().date).format('DD MMMM YYYY')}</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryTitleComponent
