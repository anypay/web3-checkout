import { atom, useRecoilState } from 'recoil'

const cartState = atom({
  key: 'cart',
  default: {
    products: [],
    date: Date.now(),
    initialized: false,
  } as ICart,
})

export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type ICart = {
  products: IProduct[];
  date: number;
  initialized: boolean;
}

export type ICartService = {
  initialize: (products: IProduct[]) => void
  get: () => ICart
  getTotal: () => number
  getTotalInCrypto: (rate: number) => number
  addProduct: (product: IProduct) => void
  removeProduct: (product: IProduct) => void
}

const CartService = () => {
  const [getState, setState] = useRecoilState<ICart>(cartState)

  const initialize = (products: IProduct[]) => {
    if (getState.initialized) {
      throw new Error('Cannot initialize more than once')
    }
    setState(state => ({ ...state, products, initialized: true }))
  }

  const get = () => {
    return getState
  }

  const getTotal = () => {
    return getState.products.reduce((acc, item) => acc + item.price, 0)
  }

  const getTotalInCrypto = (rate: number) => {
    return getTotal() * rate
  }

  const addProduct = (product: IProduct) => {
    setState(state => ({ ...state, products: state.products.concat([product]) }))
  }

  const removeProduct = (product: IProduct) => {
    setState(state => ({ ...state, products: state.products.filter(item => item.id !== product.id) }))
  }

  return {
    initialize,
    get,
    getTotal,
    getTotalInCrypto,
    addProduct,
    removeProduct,
  }
}

export default CartService
