import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import 'jest-styled-components'

import ModalTemplate from 'templates/Modal'
import theme from 'theme'

test('Modal template renders', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <ModalTemplate>
        <div>Modal contents</div>
      </ModalTemplate>
    </ThemeProvider>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
