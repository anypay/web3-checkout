import React from 'react'
import styled from 'styled-components'
import TickIconComponent from 'assets/icons/Tick'
import DotIconComponent from 'assets/icons/Dot'

type IPaymentsOptionsIconComponent = {
  children?: JSX.Element;
  active?: boolean;
}

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const ActiveStyled = styled.div`
  ${props => props.theme.views.iconSmallActive}
  ${props => props.theme.flex.alignItemsCenter}
  ${props => props.theme.flex.justifyContentCenter}
`

const InactiveStyled = styled.div`
  ${props => props.theme.views.iconSmallInactive}
  ${props => props.theme.flex.alignItemsCenter}
  ${props => props.theme.flex.justifyContentCenter}
`

function PaymentsOptionsIconComponent({ children, active }: IPaymentsOptionsIconComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled>
        {active ?
          <ActiveStyled>
            <TickIconComponent />
          </ActiveStyled>
        : null}

        {!active ?
          <InactiveStyled>
            <DotIconComponent />
          </InactiveStyled>
        : null}
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsIconComponent
