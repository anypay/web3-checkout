import { css } from 'styled-components'

export const colors = {
  white: '#ffffff',
  card: '#f4f4f4',
  primary: '#357edd',
  border: '#eeeeee',
  grey: '#777777',
  dark: '#333333',
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
  colorLight: css`
    color: ${colors.grey};
  `,
  colorDark: css`
    color: ${colors.dark};
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
    padding: 0 ${units.paddingDefault};
  `,
  defaultVertical: css`
    padding: ${units.paddingDefault} 0;
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
    padding: 0 ${units.paddingSmall};
  `,
  smallVertical: css`
    padding: ${units.paddingSmall} 0;
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
  active: css`
    border: 1px solid ${colors.primary};
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
  alignItemsCenter: css`
    align-items: center;
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
  iconSmall: css`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: ${colors.primary};
  `,
}

const combination = {
  colors,
  background,
  padding,
  border,
  font,
  flex,
  views,
}

export default combination
