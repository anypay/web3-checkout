import React from 'react'
import styled from 'styled-components'

type IReceiptHeaderComponent = {
  children?: JSX.Element;
}

const WrapperStyled = styled.div`
  overflow: hidden;
`

const ComponentStyled = styled.div`
  margin: -15px;
`

function ReceiptHeaderComponent({ children }: IReceiptHeaderComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <img src="https://anypayx.com/img/anypay-logo.png" alt="Anypay Inc." height="80" />
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptHeaderComponent
