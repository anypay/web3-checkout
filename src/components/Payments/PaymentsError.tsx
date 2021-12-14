import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const HeaderStyled = styled.div`
`

function PaymentsErrorComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <HeaderStyled>
          Error occured
          <pre>Missing invoice id in the URI</pre>
        </HeaderStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsErrorComponent
