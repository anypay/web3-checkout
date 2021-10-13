import React from 'react'
import styled from 'styled-components'

type IPaymentsOptionsItemBodyComponent = {
  children: JSX.Element;
}

const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

const ComponentStyled = styled.div`
  ${props => props.theme.background.default}
  ${props => props.theme.padding.default}
`

function PaymentsOptionsItemBodyComponent({ children }: IPaymentsOptionsItemBodyComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        {children}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsItemBodyComponent
