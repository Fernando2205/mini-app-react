import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { PlusIcon, MinusIcon, ShoppingCartLogoIcon } from '../components/icons'

export function CartPage () {
  const { cart, clearCart, addToCart, decreaseFromCart } = useCart()

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((total, product) => total + product.quantity, 0)
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='text-center py-20'>
            <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
              <ShoppingCartLogoIcon className='w-12 h-12 text-gray-400' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Tu carrito está vacío</h1>
            <p className='text-gray-600 mb-8'>
              Agrega algunos productos para comenzar tu compra
            </p>
            <Link
              to='/'
              className='inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200'
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Carrito de Compras</h1>
          <p className='text-gray-600'>{getTotalItems()} productos en tu carrito</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6'>
                <div className='space-y-4'>
                  {cart.map(product => (
                    <div key={product.id} className='flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0'>
                      <Link to={`/product/${product.id}`} className='flex-shrink-0'>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className='w-20 h-20 object-cover rounded-md hover:opacity-75 transition-opacity'
                        />
                      </Link>

                      <div className='flex-1 min-w-0'>
                        <Link to={`/product/${product.id}`}>
                          <h3 className='text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors line-clamp-2'>
                            {product.title}
                          </h3>
                        </Link>
                        <p className='text-gray-600 text-sm mt-1'>{product.category}</p>
                        <p className='text-lg font-bold text-gray-900 mt-2'>${product.price}</p>
                      </div>

                      <div className='flex items-center gap-3'>
                        <div className='flex items-center border border-gray-300 rounded-md'>
                          <button
                            onClick={() => decreaseFromCart(product)}
                            className='p-2 hover:bg-gray-100 transition-colors'
                          >
                            <MinusIcon />
                          </button>
                          <span className='px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center'>
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className='p-2 hover:bg-gray-100 transition-colors'
                          >
                            <PlusIcon />
                          </button>
                        </div>

                        <div className='text-right'>
                          <p className='font-bold text-gray-900'>
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <button
                    onClick={clearCart}
                    className='text-red-600 hover:text-red-700 font-medium transition-colors'
                  >
                    Limpiar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Resumen del Pedido</h2>

              <div className='space-y-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal ({getTotalItems()} productos)</span>
                  <span className='font-medium'>${getTotalPrice()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Envío</span>
                  <span className='font-medium'>Gratis</span>
                </div>
                <div className='border-t border-gray-200 pt-3'>
                  <div className='flex justify-between'>
                    <span className='text-lg font-semibold text-gray-900'>Total</span>
                    <span className='text-lg font-bold text-gray-900'>${getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <button className='w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 mb-4'>
                Proceder al Pago
              </button>

              <Link
                to='/'
                className='block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-md transition-colors duration-200'
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
