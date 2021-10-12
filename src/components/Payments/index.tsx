import React from 'react'
import PaymentsHeaderComponent from 'components/Payments/PaymentsHeader'
import PaymentsOptionsComponent from 'components/Payments/PaymentsOptions'
import PaymentsSummaryComponent from 'components/Payments/PaymentsSummary'
import styled from 'styled-components'

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const MainStyled = styled.div`
  ${props => props.theme.flex.directionRow}
`

const ContentStyled = styled.div`
  width: 60%;
  ${props => props.theme.padding.smallRight}
`

const SidebarStyled = styled.div`
  width: 40%;
  ${props => props.theme.padding.smallLeft}
`

function PaymentsComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <PaymentsHeaderComponent />

        <MainStyled>
          <ContentStyled>
            <PaymentsOptionsComponent />
          </ContentStyled>
          
          <SidebarStyled>
            <PaymentsSummaryComponent />
          </SidebarStyled>
        </MainStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsComponent
