import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.directionRow}
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH2}
  ${props => props.theme.font.colorGreen}
  ${props => props.theme.font.weight600}
`

function ReceiptSuccessSuccessComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <TitleStyled>
          🎉 Payment Complete
        </TitleStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptSuccessSuccessComponent
