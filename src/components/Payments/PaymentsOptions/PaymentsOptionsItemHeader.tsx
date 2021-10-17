import React from 'react'
import styled from 'styled-components'

type IPaymentsOptionsItemHeaderComponent = {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
  active?: boolean;
}

type IComponentStyled = {
  readonly active?: boolean;
};


const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

const ComponentStyled = styled.div<IComponentStyled>`
  ${props => props.active && props.theme.border.activeGlow}
  ${props => !props.active && props.theme.border.defaultGlow}

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

function PaymentsOptionsItemComponent({ title, subtitle, icon, active }: IPaymentsOptionsItemHeaderComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled active={active}>
        <ContentStyled>
          <TitleStyled>{title}</TitleStyled>
          <SubtitleStyled>{subtitle}</SubtitleStyled>
        </ContentStyled>

        <IconStyled>
          {icon}
        </IconStyled>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsItemComponent
