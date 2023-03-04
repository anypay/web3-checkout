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
  return <img className="header-logo" src="https://anypayx.com/app/assets/images/anypay-logo.png" alt="Logo" style={{width:"60px",float:"right"}}/>;
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
