import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
  ${props => props.theme.flex.one}
  ${props => props.theme.flex.directionColumn}
  ${props => props.theme.flex.alignItemsCenter}
`

const HeaderStyled = styled.div`
  ${props => props.theme.font.alignCenter}
  font-size: 4rem;
`

const ContentStyled = styled.div`
  ${props => props.theme.font.colorGreen}
  ${props => props.theme.padding.defaultVertical}
  font-size: 3rem;
`

const ActionStyled = styled.button`
  ${props => props.theme.font.colorWhite}
  ${props => props.theme.font.sizeH1}
  ${props => props.theme.padding.defaultHorizontal}
  ${props => props.theme.padding.smallVertical}
  ${props => props.theme.border.defaultRadius}
  ${props => props.theme.background.success}
  border: 0;
`

function PaymentsSuccessComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <HeaderStyled>
          🎉
        </HeaderStyled>
        <ContentStyled>
          PAID
        </ContentStyled>
        <ActionStyled>
          PAID
        </ActionStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsSuccessComponent
