import React from 'react'
import styled from 'styled-components'
import PaymentsOptionsIconComponent from './PaymentsOptionsIcon'

type IPaymentsOptionsItemHeaderComponent = {
  title: string;
  subtitle: string;
  active?: boolean;
  disabled?: boolean;
}

type IComponentStyled = {
  readonly active?: boolean;
  readonly disabled?: boolean;
};


const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

const ComponentStyled = styled.div<IComponentStyled>`
  ${props => props.active && props.theme.border.activeGlow}
  ${props => !props.active && props.theme.border.defaultGlow}

  ${props => !props.disabled && props.theme.font.colorLight}

  ${props => props.theme.background.default}
  ${props => props.theme.padding.defaultHorizontal}
  ${props => props.theme.padding.smallVertical}
  ${props => props.theme.border.defaultRadius}

  ${props => props.theme.flex.one}
  ${props => props.theme.flex.directionRow}
  ${props => props.theme.flex.alignItemsCenter}
`

const TitleStyled = styled.div`
  ${props => props.theme.font.sizeH2}
  ${props => props.theme.font.weight600}
`

const SubtitleStyled = styled.div`
  ${props => props.theme.font.sizeP}
  ${props => props.theme.font.colorLight}
`

const ContentStyled = styled.div`
  ${props => props.theme.flex.one}
`

const IconStyled = styled.div`
  ${props => props.theme.padding.defaultLeft}
`

function PaymentsOptionsItemComponent({ title, subtitle, active, disabled }: IPaymentsOptionsItemHeaderComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled active={active} disabled={disabled}>
        <ContentStyled>
          <TitleStyled>{title}</TitleStyled>
          <SubtitleStyled>{subtitle}</SubtitleStyled>
        </ContentStyled>

        <IconStyled>
          <PaymentsOptionsIconComponent active={active} />
        </IconStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsItemComponent
