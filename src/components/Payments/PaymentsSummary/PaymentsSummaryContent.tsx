import React from 'react'
import styled from 'styled-components'
import type { ICartService } from 'services/Cart'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.smallVertical}
`

const ComponentStyled = styled.div`
`

const ProductStyled = styled.div`
  ${props => props.theme.padding.smallBottom}
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

function PaymentsSummaryContentContent({ cart }: { cart: ICartService }) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        {cart.get().products.map(product => (
          <ProductStyled>
            <TitleStyled>{product.name}</TitleStyled>
            <SubtitleStyled>{product.description}</SubtitleStyled>
          </ProductStyled>
        ))}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryContentContent
