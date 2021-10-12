import React from 'react'
import styled from 'styled-components'

type IPaymentsOptionsIconComponent = {
  children?: JSX.Element;
}

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
  ${props => props.theme.views.iconSmall}
`

function PaymentsOptionsIconComponent({ children }: IPaymentsOptionsIconComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        {children}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsIconComponent
