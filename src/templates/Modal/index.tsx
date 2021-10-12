import React from 'react'
import styled from 'styled-components'

type IModalTemplate = {
  children: JSX.Element;
}

const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
  ${props => props.theme.background.card}
`

const ComponentStyled = styled.div`
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
