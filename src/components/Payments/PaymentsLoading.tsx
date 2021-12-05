import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const HeaderStyled = styled.div`
`

function PaymentsLoadingComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <HeaderStyled>
          Loading
        </HeaderStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsLoadingComponent
