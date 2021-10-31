import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppComponent from 'App'

jest.mock('services/Anypay')

test('AnypayService is initialized', () => {
  render(<AppComponent />)
})
