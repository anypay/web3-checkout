import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

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
  const anypay = useContext(PaymentsComponentContext)
  const status = anypay.state.invoice?.status

  // if (status === 'paid') {
  //   return null
  // }

  return (
    <WrapperStyled>
      <ComponentStyled>
        {children}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsItemBodyComponent
