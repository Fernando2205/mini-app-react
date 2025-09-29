import { useCart } from '../hooks/useCart'
import { ClearCartIcon, CartIcon } from './icons'
import { useId } from 'react'
import { Link } from 'react-router-dom'

function CartItem ({ id, thumbnail, title, price, quantity, addToCart, removeFromCart }) {
  return (
    <li className='bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300'>
      <div className='flex gap-3'>
        <Link to={`/product/${id}`} className='flex-shrink-0'>
          <img
            src={thumbnail}
            alt={`Foto de ${title}`}
            className='w-16 h-16 object-cover rounded-lg hover:scale-105 transition-transform duration-300'
          />
        </Link>
        <div className='flex-1 min-w-0'>
          <Link to={`/product/${id}`} className='block'>
            <h4 className='text-white font-semibold text-sm line-clamp-2 hover:text-blue-400 transition-colors'>
              {title}
            </h4>
          </Link>
          <p className='text-blue-400 font-bold text-lg mt-1'>${price}</p>
          <div className='flex items-center justify-between mt-2'>
            <span className='text-gray-400 text-sm'>Cant: {quantity}</span>
            <div className='flex gap-1'>
              <button
                onClick={addToCart}
                className='w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors text-sm font-bold'
              >
                +
              </button>
              <button
                onClick={removeFromCart}
                className='w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors text-sm font-bold'
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, removeFromCart } = useCart()

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((total, product) => total + product.quantity, 0)
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <label
        className='fixed top-6 right-6 z-[60] cursor-pointer group'
        htmlFor={cartCheckboxId}
      >
        <div className='relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110'>
          <CartIcon />
          {getTotalItems() > 0 && (
            <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse'>
              {getTotalItems()}
            </div>
          )}
        </div>
      </label>

      {/* Hidden Checkbox */}
      <input type='checkbox' id={cartCheckboxId} hidden className='peer' />

      {/* Cart Sidebar */}
      <aside className='fixed inset-y-0 right-0 z-50 w-96 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-700/50 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-500 ease-in-out shadow-2xl'>
        {/* Header */}
        <div className='sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-6 border-b border-gray-700/50'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text'>
              🛒 Carrito
            </h2>
            <label htmlFor={cartCheckboxId} className='cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors'>
              <svg className='w-6 h-6 text-gray-400 hover:text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </label>
          </div>
          {cart.length > 0 && (
            <div className='mt-3 flex items-center justify-between text-sm'>
              <span className='text-gray-400'>{getTotalItems()} productos</span>
              <span className='text-blue-400 font-bold text-lg'>${getTotalPrice()}</span>
            </div>
          )}
        </div>

        {/* Cart Content */}
        <div className='flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]'>
          {cart.length === 0
            ? (
              <div className='flex flex-col items-center justify-center h-64 text-center'>
                <div className='text-6xl mb-4'>🛒</div>
                <h3 className='text-xl font-semibold text-white mb-2'>Carrito vacío</h3>
                <p className='text-gray-400 mb-6'>Agrega productos para comenzar</p>
                <label
                  htmlFor={cartCheckboxId}
                  className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105'
                >
                  Explorar Productos
                </label>
              </div>
              )
            : (
              <ul className='space-y-4'>
                {cart.map(product => (
                  <CartItem
                    key={product.id}
                    {...product}
                    addToCart={() => addToCart(product)}
                    removeFromCart={() => removeFromCart(product)}
                  />
                ))}
              </ul>
              )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className='sticky bottom-0 bg-gradient-to-t from-gray-900 to-gray-800/90 backdrop-blur-sm p-6 border-t border-gray-700/50 space-y-4'>
            <div className='flex items-center justify-between text-lg font-bold'>
              <span className='text-white'>Total:</span>
              <span className='text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl'>
                ${getTotalPrice()}
              </span>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <button
                onClick={clearCart}
                className='flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 px-4 py-3 rounded-xl font-semibold transition-all duration-300'
              >
                <ClearCartIcon />
                Limpiar
              </button>
              <Link
                to='/cart'
                className='flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105'
              >
                💳 Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay */}
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 peer-checked:opacity-100 transition-opacity duration-500 pointer-events-none peer-checked:pointer-events-auto'>
        <label htmlFor={cartCheckboxId} className='absolute inset-0 cursor-pointer' />
      </div>
    </>
  )
}
