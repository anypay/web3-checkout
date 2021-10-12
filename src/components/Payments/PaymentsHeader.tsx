import React from 'react'
import styled from 'styled-components'

type IPaymentsHeaderComponent = {
  children?: JSX.Element;
}

const WrapperStyled = styled.div`
  padding-bottom: 3rem;
`

const ComponentStyled = styled.div`
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH1}
  ${props => props.theme.font.weight600}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeH3}
`

function PaymentsHeaderComponent({ children }: IPaymentsHeaderComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>How do you want to pay?</TitleStyled>
        <SubtitleStyled>Select the wallet you want to pay from.</SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsHeaderComponent
