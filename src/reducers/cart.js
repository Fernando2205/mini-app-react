export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []
// Función para actualizar localStorage antes de retornar el nuevo estado
export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const CART_ACTIONS_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DECREASE_FROM_CART: 'DECREASE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}
export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case CART_ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
      // Usando structuredClone
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }
      // Si el producto no está en el carrito
      const newState = [...state, {
        ...actionPayload, // producto
        quantity: 1
      }]

      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS_TYPES.REMOVE_FROM_CART:{
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTIONS_TYPES.DECREASE_FROM_CART: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        if (newState[productInCartIndex].quantity > 1) {
          newState[productInCartIndex].quantity -= 1
        } else {
          // If quantity becomes 0, remove the item
          return state.filter(item => item.id !== id)
        }
        updateLocalStorage(newState)
        return newState
      }
      return state
    }
    case CART_ACTIONS_TYPES.CLEAR_CART: {
      const emptyCart = []
      updateLocalStorage(emptyCart)
      return emptyCart
    }
  }
  return state
}
