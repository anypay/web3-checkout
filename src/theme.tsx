import { css } from 'styled-components'

export const colors = {
  card: '#333333',
}

export const units = {
  paddingDefault: '12px',
}

/**
 * Background colors
 */
const background = {
  card: css`
    background-color: ${colors.card};
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
}

/**
 * Borders
 */
const border = {
  radius: css`
    border-radius: 4px;
  `,
}

const combination = {
  colors,
  background,
  padding,
  border,
}

export default combination
