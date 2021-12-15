import React, { useContext, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'
import Countdown, { CountdownRenderProps } from 'react-countdown'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.directionRow}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
  word-break: break-all;
`

// @ts-ignore
function CountdownMessageComponent({ seconds, completed, anypay } : CountdownRenderProps) {
  if (completed && anypay.state.invoice?.redirect_url) {
    window.location.href = anypay.state.invoice?.redirect_url
  }

  return (
    <SubtitleStyled>
      {completed ? `You have been redirected back to merchant` : null}
      {!completed ? `You will be redirected to merchant in ${seconds} seconds` : null}
    </SubtitleStyled>
  )
}

function ReceiptSummaryCountdownComponent() {
  const anypay = useContext(PaymentsComponentContext)
  const date = useMemo(() => Date.now() + 10000, [])
  // @ts-ignore
  const renderer = useCallback((props) => <CountdownMessageComponent {...props} anypay={anypay} />, [anypay])
  
  if (!anypay.state.invoice?.redirect_url) {
    return null
  }

  return (
    <WrapperStyled>
      <ComponentStyled>
        <SubtitleStyled>
          <Countdown
            date={date}
            // @ts-ignore
            renderer={renderer}
          />
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryCountdownComponent
