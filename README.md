# Getting started with Anypay SDK

Payment popup widget for AnypayX

## Installation

```html
<!-- Element the widget modal will be rendered into -->
<div id="anypay-widget"></div>

<!-- Script location, could be loaded from cdn or your server -->
<script src="https://anypay.sv/static/js/main.js"></script>

<!-- Show widget modal -->
<script>
  var loadModal = () => {
    window.AnypaySDK({
      element: 'anypay-widget',
      config: {
        invoiceId: 'GWT_QcGq-',
        onAnypayLoadSuccess: console.log,
        onAnypayLoadFailure: console.error,
        onAnypayPaymentSuccess: console.log,
        onAnypayPaymentFailure: console.error,
      },
    })
  }
</script>
```

## API
### `element`
input for `document.getElementById` selector that the widget will be render into

### `config.invoiceId`
Anypay invoice id

### `config.onAnypayLoadSuccess`
Callback when invoice data is loaded and modal is shown

### `config.onAnypayLoadFailure`
Callback when invoice data could not be loaded, most likely due to wrong invoiceId provided

### `config.onAnypayPaymentSuccess`
Callback when payment is done using any payment method (note: might be executed multiple times)

### `config.onAnypayPaymentFailure`
Callback when payment is could not be done (note: might be executed multiple times)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn example`

Runs the example integration.\
Open [http://localhost:5672/](http://localhost:5672/) to view it in the browser.
