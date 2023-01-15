import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
`

const ActionStyled = styled.button`
  ${props => props.theme.font.sizeH1}
  ${props => props.theme.font.colorLight}
  ${props => props.theme.font.colorWhite}
  ${props => props.theme.background.confirming}
  ${props => props.theme.padding.default}
  ${props => props.theme.border.defaultRadius}
  width: 100%;
  border: 0;
`

function ReceiptSummaryActionComponent() {
  const anypay = useContext(PaymentsComponentContext)

  const handleClick = () => {
    if (anypay.state.invoice?.redirect_url) {
      window.location.href = anypay.state.invoice?.redirect_url
    }

    else {
      anypay.setModalState(false)
    }
  }

  return (
    <WrapperStyled>
      <ComponentStyled>
        <ActionStyled onClick={handleClick}>
          DONE
        </ActionStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryActionComponent
