import styled from 'styled-components'

type IPaymentsOptionsItemButtonComponent = {
  title: string;
  subtitle: string;
  handler?: any;
  disabled?: boolean;
}

type IComponentStyled = {
  readonly disabled?: boolean;
};

const WrapperStyled = styled.div`
  ${props => props.theme.padding.defaultBottom}
`

const ComponentStyled = styled.div<IComponentStyled>`
  ${props => props.disabled && props.theme.font.colorLight}

  ${props => props.theme.background.default}
  ${props => props.theme.padding.defaultHorizontal}
  ${props => props.theme.padding.smallVertical}
  ${props => props.theme.border.defaultRadius}


  ${props => !props.disabled && 'cursor: pointer;'}


  &:hover {
    background: ${props => !props.disabled && props.theme.colors.card}
  }
`

function PaymentsOptionsItemButtonComponent({ title, subtitle, handler , disabled }: IPaymentsOptionsItemButtonComponent) {
  return (
    <WrapperStyled>
      <ComponentStyled 
        disabled={disabled}
        onClick={handler}
      >
        <div>{title}</div>
        <div><small>{subtitle}</small></div>
      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PaymentsOptionsItemButtonComponent
