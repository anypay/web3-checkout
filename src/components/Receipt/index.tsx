import React from 'react'
import ReceiptHeaderComponent from 'components/Receipt/ReceiptHeader'
import ReceiptSummaryComponent from 'components/Receipt/ReceiptSummary'
import ReceiptSummaryInfoComponent from 'components/Receipt/ReceiptSummary/ReceiptSummaryInfo'
import ReceiptSummaryCountdownComponent from 'components/Receipt/ReceiptSummary/ReceiptSummaryCountdown'
import ReceiptSummaryActionComponent from 'components/Receipt/ReceiptSummary/ReceiptSummaryAction'
import ReceiptSummarySuccessComponent from 'components/Receipt/ReceiptSummary/ReceiptSummarySuccess'
import styled from 'styled-components'
import { generateMedia } from 'styled-media-query'

const media = generateMedia({
  medium: '40rem',
})

const WrapperStyled = styled.div`
`

const ComponentStyled = styled.div`
`

const HeaderStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
  ${media.greaterThan('medium')`
    padding-bottom: 3rem;
  `}
`

const MainStyled = styled.div`
  ${media.greaterThan('medium')`
    ${props => props.theme.flex.directionRow}
  `}

  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
  `}
`

const ContentStyled = styled.div`
  ${media.greaterThan('medium')`
    width: 60%;
    ${props => props.theme.padding.smallRight}
  `}

  ${media.lessThan('medium')`
    order: 2;
  `}
`

const SidebarStyled = styled.div`
  ${media.greaterThan('medium')`
    width: 40%;
    ${props => props.theme.padding.smallLeft}
  `}

  ${media.lessThan('medium')`
    order: 1;
  `}
`

function ReceiptComponent() {
  return (
    <WrapperStyled>
      <ComponentStyled>
        <HeaderStyled>
          <ReceiptHeaderComponent />
        </HeaderStyled>

        <MainStyled>
          <ContentStyled>
            <ReceiptSummarySuccessComponent />
            <ReceiptSummaryInfoComponent />
            <ReceiptSummaryActionComponent />
            <ReceiptSummaryCountdownComponent />
          </ContentStyled>

          <SidebarStyled>
            <ReceiptSummaryComponent />
          </SidebarStyled>
        </MainStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default ReceiptComponent
