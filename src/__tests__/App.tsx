import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppComponent from 'App'

jest.mock('services/Anypay', () =>
  () => ({
    configure: () => {},
    getState: () => ({ isLoading: false }),
  })
)

test('AnypayService is initialized', () => {
  render(<AppComponent />)
})
