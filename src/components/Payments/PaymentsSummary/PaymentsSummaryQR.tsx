import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { PaymentsComponentContext } from 'components/Payments/context'
import ScanIconComponent from 'assets/icons/Scan'
import QRCode from 'react-qr-code'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
  ${props => props.theme.border.default}
  ${props => props.theme.border.defaultRadius}
`

const ComponentStyled = styled.div`
`

const AlignStyled = styled.div`
  ${props => props.theme.flex.alignItemsCenter}
`

const TitleStyled = styled.div`
  ${props => props.theme.padding.smallLeft}
  ${props => props.theme.font.sizeH3}
  ${props => props.theme.font.weight600}
  ${props => props.theme.flex.alignItemsCenter}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
`

const SpacingStyled = styled.div`
  ${props => props.theme.padding.small}
`

function PaymentsSummaryQRComponent() {
  const anypay = useContext(PaymentsComponentContext)
  const theme = useContext(ThemeContext)

  return (
    <WrapperStyled>
      <ComponentStyled>
        <AlignStyled>
          <ScanIconComponent />

          <TitleStyled>
            Scan to pay instantly
          </TitleStyled>
        </AlignStyled>
        <SubtitleStyled>Scan and pay using Simplified Payments.</SubtitleStyled>

        <SpacingStyled />

        <QRCode
          value={`pay:?r=https://api.anypayinc.com/r/${anypay.state.invoiceId}`}
          size={180}
          fgColor={theme.colors.dark}
        />
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSummaryQRComponent
