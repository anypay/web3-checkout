import { css } from 'styled-components'

export const colors = {
  white: '#ffffff',
  card: '#f4f4f4',
  primary: '#357edd',
  border: '#eeeeee',
  grey: '#777777',
  dark: '#333333',
  red: '#e74c3c',
  green: '#27ae60',
  link: '#0984e3',
}

export const units = {
  radiusDefault: '0.5rem',

  paddingDefault: '1rem',
  paddingSmall: '0.5rem',

  fontSizeH1: '1.5rem',
  fontSizeH2: '1.125rem',
  fontSizeH3: '1rem',
  fontSizeP: '.75rem',
  fontSizeCaption: '0.5rem',
  fontWeight600: 600,
}

/**
 * Background colors
 */
const background = {
  default: css`
    background-color: ${colors.white};
  `,
  card: css`
    background-color: ${colors.card};
  `,
  success: css`
    background-color: ${colors.green};
  `,
}

/**
 * Fonts
 */
const font = {
  sizeH1: css`
    font-size: ${units.fontSizeH1};
    line-height: 1.25;
  `,
  sizeH2: css`
    font-size: ${units.fontSizeH2};
    line-height: 1.5;
  `,
  sizeH3: css`
    font-size: ${units.fontSizeH3};
    line-height: 1.5;
  `,
  sizeP: css`
    font-size: ${units.fontSizeP};
    line-height: 1.5;
  `,
  weight600: css`
    font-weight: ${units.fontWeight600};
  `,
  colorWhite: css`
    color: ${colors.white};
  `,
  colorLink: css`
    color: ${colors.link};
  `,
  colorLight: css`
    color: ${colors.grey};
  `,
  colorDark: css`
    color: ${colors.dark};
  `,
  colorPrimary: css`
    color: ${colors.primary};
  `,
  colorRed: css`
    color: ${colors.red};
  `,
  colorGreen: css`
    color: ${colors.green};
  `,
  alignCenter: css`
    text-align: center;
  `,
  alignEnd: css`
    text-align: end;
  `,
}

/**
 * Paddings
 */
const padding = {
  default: css`
    padding: ${units.paddingDefault};
  `,
  defaultHorizontal: css`
    padding-left: ${units.paddingDefault};
    padding-right: ${units.paddingDefault};
  `,
  defaultVertical: css`
    padding-top: ${units.paddingDefault};
    padding-bottom: ${units.paddingDefault};
  `,
  defaultBottom: css`
    padding-bottom: ${units.paddingDefault};
  `,
  defaultTop: css`
    padding-top: ${units.paddingDefault};
  `,
  defaultLeft: css`
    padding-left: ${units.paddingDefault};
  `,
  defaultRight: css`
    padding-right: ${units.paddingDefault};
  `,

  small: css`
    padding: ${units.paddingSmall};
  `,
  smallHorizontal: css`
    padding-left: ${units.paddingSmall};
    padding-right: ${units.paddingSmall};
  `,
  smallVertical: css`
    padding-top: ${units.paddingSmall};
    padding-bottom: ${units.paddingSmall};
  `,
  smallBottom: css`
    padding-bottom: ${units.paddingSmall};
  `,
  smallTop: css`
    padding-top: ${units.paddingSmall};
  `,
  smallLeft: css`
    padding-left: ${units.paddingSmall};
  `,
  smallRight: css`
    padding-right: ${units.paddingSmall};
  `,
}

/**
 * Borders
 */
const border = {
  default: css`
    border: 1px solid ${colors.border};
  `,
  defaultGlow: css`
    border: 1px solid ${colors.border};
  `,
  active: css`
    border: 1px solid ${colors.primary};
  `,
  activeGlow: css`
    border: 1px solid ${colors.primary};
    box-shadow: 0px 0px 2px ${colors.primary};
  `,
  defaultRadius: css`
    border-radius: ${units.radiusDefault};
  `,
}

/**
 * Borders
 */
const flex = {
  directionRow: css`
    flex-direction: row;
    display: flex;
  `,
  directionColumn: css`
    flex-direction: column;
    display: flex;
  `,
  alignItemsCenter: css`
    align-items: center;
    display: flex;
  `,
  justifyContentCenter: css`
    justify-content: center;
    display: flex;
  `,
  one: css`
    flex: 1;
  `,
}

/**
 * Views
 */
const views = {
  iconSmallActive: css`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: ${colors.primary};
  `,
  iconSmallInactive: css`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: ${colors.card};
  `,
}

const modal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    borderRadius: '0.5rem',
  },
  overlay: {
    backgroundColor: '#33333380',
    zIndex: 9999,
  }
}

const combination = {
  colors,
  background,
  padding,
  border,
  font,
  flex,
  views,
  modal,
}

export default combination
