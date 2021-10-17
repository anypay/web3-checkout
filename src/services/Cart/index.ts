import { atom, useRecoilState } from 'recoil'

const cartState = atom({
  key: 'cart',
  default: {
    products: [],
    date: Date.now(),
  } as ICart,
})

type IProduct = {
  id: string;
  name: string;
  price: number;
}

type ICart = {
  products: IProduct[];
}

const Cart = () => {
  const [getState, setState] = useRecoilState<ICart>(cartState)

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
    get,
    getTotal,
    getTotalInCrypto,
    addProduct,
    removeProduct,
  }
}

export default Cart