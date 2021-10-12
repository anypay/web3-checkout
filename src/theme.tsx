import { css } from 'styled-components'

export const colors = {
  white: '#ffffff',
  card: '#333333',
  primary: '#357edd',
  border: '#eeeeee',
  grey: '#777777',
}

export const units = {
  paddingDefault: '1rem',
  paddingSmall: '0.5rem',

  fontSizeH1: '1.5rem',
  fontSizeH4: '1.125rem',
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
}

/**
 * Paddings
 */
const padding = {
  default: css`
    padding: ${units.paddingDefault};
  `,
  defaultHorizontal: css`
    padding: ${units.paddingDefault} 0;
  `,
  defaultVertical: css`
    padding: 0 ${units.paddingDefault};
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
    padding: ${units.paddingSmall} 0;
  `,
  smallVertical: css`
    padding: 0 ${units.paddingSmall};
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
  defaultRadius: css`
    border-radius: 4px;
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
  one: css`
    flex: 1;
    width: '100%',
    height: '100%',
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
