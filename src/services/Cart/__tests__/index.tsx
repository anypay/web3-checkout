import { RecoilRoot } from 'recoil'
import { renderHook, act } from '@testing-library/react-hooks'
import CartService from 'services/Cart'

const products = [
  { id: '1', name: 'First product', price: 1.99 },
  { id: '2', name: 'Second product', price: 2.99 },
  { id: '3', name: 'Third product', price: 3.99 },
  { id: '4', name: 'Fourth product', price: 4.99 },
]

test('Products cart initializes, add/remove operations work', () => {
  const { result } = renderHook(() => CartService(), { wrapper: RecoilRoot })

  expect(result.current.get()).toEqual({ products: [] })

  act(() => {
    result.current.addProduct(products[0])
  })
  expect(result.current.get()).toEqual({ products: [products[0]] })

  act(() => {
    result.current.addProduct(products[1])
  })
  expect(result.current.get()).toEqual({ products: [products[0], products[1]] })
  
  act(() => {
    result.current.removeProduct(products[0])
  })
  expect(result.current.get()).toEqual({ products: [products[1]] })
})
