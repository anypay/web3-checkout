import React, { useEffect } from 'react'
import PaymentsHeaderComponent from 'components/Payments/PaymentsHeader'
import PaymentsOptionsComponent from 'components/Payments/PaymentsOptions'
import PaymentsSummaryComponent from 'components/Payments/PaymentsSummary'
import styled from 'styled-components'
import CartService from 'services/Cart'

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
  const cart = CartService()

  const products = [
    { id: '1', name: 'Ancient Vase', description: 'Ancient vase from ancient times', price: 19.00 },
    { id: '2', name: 'Ancient Clock', description: 'Ancient clock from ancient times', price: 47.00 },
  ]

  useEffect(() => {
    if (!cart.get().initialized) {
      cart.initialize(products)
    }
  }, [])

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
