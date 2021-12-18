import React, { useContext, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import type { IAnypayServiceResponse } from 'services/Anypay'

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

function CountdownMessageComponent({ seconds, completed, anypay } : CountdownRenderProps & { anypay: IAnypayServiceResponse }) {
  if (completed && anypay.state.invoice?.redirect_url) {
    window.location.href = anypay.state.invoice?.redirect_url
  }

  if (completed && !anypay.state.invoice?.redirect_url) {
    anypay.setModalState(false)
  }

  return (
    <SubtitleStyled>
      {completed ? `You have been redirected back to merchant` : null}
      {!completed ? `You will be redirected back to merchant in ${seconds} seconds` : null}
    </SubtitleStyled>
  )
}

function ReceiptSummaryCountdownComponent() {
  const anypay = useContext(PaymentsComponentContext)
  const date = useMemo(() => Date.now() + 20000, [])
  // @ts-ignore
  const renderer = useCallback((props) => <CountdownMessageComponent {...props} anypay={anypay} />, [anypay])

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
