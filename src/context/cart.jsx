import { createContext, useReducer } from 'react'
import { cartInitialState, cartReducer } from '../reducers/cart'

// Crear contexto
export const cartContext = createContext()

function useCartReducer () {
  // Dispatch se encarga de enviar las acciones al reducer
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  // const [cart, setCart] = useState([])
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }

  const decreaseFromCart = (product) => {
    dispatch({ type: 'DECREASE_FROM_CART', payload: product })
  }

  return { cart: state, addToCart, clearCart, removeFromCart, decreaseFromCart }
}

// Crear provider

// Ahora la dependencia de usar React Context es minima
export function CartProvider ({ children }) {
  const { cart, addToCart, clearCart, removeFromCart, decreaseFromCart } = useCartReducer()
  return (
    <cartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, decreaseFromCart }}> {children} </cartContext.Provider>
  )
}
