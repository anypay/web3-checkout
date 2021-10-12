import React from 'react'
import styled from 'styled-components'

type IModalTemplate = {
  children: JSX.Element;
}

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
`

const ComponentStyled = styled.div`
  max-width: 48rem;

  ${props => props.theme.padding.default}
  ${props => props.theme.background.default}
  ${props => props.theme.border.defaultRadius}
`

function ModalTemplate({ children }: IModalTemplate) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        {children}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ModalTemplate
