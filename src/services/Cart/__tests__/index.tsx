import { RecoilRoot } from 'recoil'
import { renderHook, act } from '@testing-library/react-hooks'
import CartService from 'services/Cart'
import {expect, jest, test} from '@jest/globals'

jest.useFakeTimers('modern')

const products = [
  { id: '1', name: 'First product', description: 'First description', price: 1.99 },
  { id: '2', name: 'Second product', description: 'Second description', price: 2.99 },
  { id: '3', name: 'Third product', description: 'Third description', price: 3.99 },
  { id: '4', name: 'Fourth product', description: 'Fourth description', price: 4.99 },
]

test('Products cart initializes', () => {
  const { result } = renderHook(() => CartService(), { wrapper: RecoilRoot })

  expect(result.current.get()).toMatchObject({ products: [] })

  act(() => {
    result.current.initialize(products)
  })

  expect(result.current.get()).toMatchObject({ products, initialized: true })

  expect(result.current.initialize).toThrow('Cannot initialize more than once')
})

test('Cart adds and removes products', () => {
  const { result } = renderHook(() => CartService(), { wrapper: RecoilRoot })

  act(() => {
    result.current.addProduct(products[0])
  })
  expect(result.current.get()).toMatchObject({ products: [products[0]] })

  act(() => {
    result.current.addProduct(products[1])
  })
  expect(result.current.get()).toMatchObject({ products: [products[0], products[1]] })
  
  act(() => {
    result.current.removeProduct(products[0])
  })
  expect(result.current.get()).toMatchObject({ products: [products[1]] })
})

test('Products total calculated', () => {
  const { result } = renderHook(() => CartService(), { wrapper: RecoilRoot })

  act(() => {
    result.current.addProduct(products[0])
    result.current.addProduct(products[1])
    result.current.addProduct(products[2])
  })
  expect(result.current.getTotal()).toEqual(
    products[0].price +
    products[1].price +
    products[2].price
  )
})

test('Products total in crypto calculated', () => {
  const { result } = renderHook(() => CartService(), { wrapper: RecoilRoot })
  const rate = 0.00077

  act(() => {
    result.current.addProduct(products[0])
    result.current.addProduct(products[1])
    result.current.addProduct(products[2])
  })
  expect(result.current.getTotalInCrypto(rate)).toEqual((
    products[0].price +
    products[1].price +
    products[2].price
  ) * rate)
})
