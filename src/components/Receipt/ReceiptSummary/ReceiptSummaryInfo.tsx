import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'

import axios from 'axios'

import { baseURL } from 'services/Anypay/api'

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

const LinkStyled = styled.span`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLink}
  ${props => props.theme.padding.smallLeft}
`

function ReceiptSummaryInfoComponent() {
  const anypay = useContext(PaymentsComponentContext)

  const [payment, setPayment] = useState<any>(null)

  useEffect(() => {
    axios.get(`${baseURL}api/v1/invoices/${anypay.state.invoice?.uid}`).then(({data}) => {
      setPayment(data.payment)
    })

  }, [anypay.state.invoice?.uid])

  if (!payment) { return <div></div> }

  return (
    <WrapperStyled>
      <ComponentStyled>
        <SubtitleStyled>
          Transaction ID:
          <LinkStyled>
            <a href={payment.block_explorer_url}>{anypay.state.invoice?.hash}</a>
          </LinkStyled>
        </SubtitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSummaryInfoComponent
