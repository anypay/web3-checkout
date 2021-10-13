# Getting started with AnyPay SDK

Payment popup widget for AnyPay, Inc.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn example`

Runs the example integration.\
Open [http://localhost:672/](http://localhost:672/) to view it in the browser.

### `yarn storybook`

Runs the storybook mode.\
Open [http://localhost:6006/](http://localhost:6006/) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Styling guide

Common conventions for styling guide

### styled components

Use [styled components](https://styled-components.com/docs/advanced#theming) for common theming and styling. Components used in should follow following naming convention `[ComponentName]Styled`.

### compose and reuse

Custom component styling should be minimized as much as possible. Styling should be created by composing and reusing smaller chunks defined at `theme.tsx`.

```js
const WrapperStyled = styled.div`
  ${props => props.theme.padding.default}
  ${props => props.theme.background.card}
`

...

<WrapperStyled>
  ${this.props.children}
</WrapperStyled>
```
