import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
`

const ActionStyled = styled.a`
  ${props => props.theme.font.sizeH1}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.font.colorWhite}
  ${props => props.theme.background.success}
  ${props => props.theme.padding.default}
  ${props => props.theme.border.defaultRadius}
  width: 100%;
  border: 0;
`

function ReceiptSummaryActionComponent() {
  const anypay = useContext(PaymentsComponentContext)

  if (!anypay.state.invoice?.redirect_url) {
    return null
  }

  return (
    <WrapperStyled>
      <ComponentStyled>
        <ActionStyled href={anypay.state.invoice?.redirect_url}>
          DONE
        </ActionStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryActionComponent
