import React from 'react'
import styled from 'styled-components'

type IPaymentsHeaderComponent = {
  children?: JSX.Element;
}

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH1}
  ${props => props.theme.font.weight600}
`

/*const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeH3}
`*/

function HeaderLogo() {
  // Import result is the URL of your image
  return <img className="header-logo" src="https://bico.media/23f7b5944a380ff2adedd78703edba8db39aa5741cfc0c045d1fab4ab4cd6270" alt="Logo" style={{width:"60px",float:"right"}}/>;
}


function PaymentsHeaderComponent({ children }: IPaymentsHeaderComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
      <HeaderLogo/>
        <TitleStyled>Pay With Your Blockchain Wallet</TitleStyled>
        
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsHeaderComponent
