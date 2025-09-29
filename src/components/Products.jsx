import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, PlusIcon, MinusIcon, StarIcon } from './icons'

export function Products ({ products }) {
  const { addToCart, cart, removeFromCart, decreaseFromCart } = useCart()
  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  const getProductQuantity = (product) => {
    const cartItem = cart.find(item => item.id === product.id)
    return cartItem ? cartItem.quantity : 0
  }

  const getStockBadge = (stock) => {
    if (stock > 50) return { text: 'En Stock', color: 'bg-green-100 text-green-800' }
    if (stock > 10) return { text: 'Pocas Unidades', color: 'bg-yellow-100 text-yellow-800' }
    return { text: 'Últimas Unidades', color: 'bg-red-100 text-red-800' }
  }

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        filled={index < Math.floor(rating)}
      />
    ))
  }

  return (
    <main className='bg-white py-12 px-4'>
      <div className='max-w-none mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Productos Destacados
          </h2>
          <p className='text-gray-600 text-lg'>Descubre nuestra selección premium de productos</p>
        </div>

        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
          {products.map(product => {
            const isInCart = checkProductInCart(product)
            const quantity = getProductQuantity(product)
            const stockBadge = getStockBadge(product.stock)

            return (
              <li key={product.id} className='group'>
                <div className='bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300'>
                  {/* Image Container */}
                  <div className='relative overflow-hidden'>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </Link>

                    {/* Stock Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${stockBadge.color}`}>
                      {stockBadge.text}
                    </div>

                    {/* Price Badge */}
                    <div className='absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-md font-bold text-sm'>
                      ${product.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    {/* Category */}
                    <span className='inline-block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2'>
                      {product.category}
                    </span>

                    {/* Title */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className='text-gray-900 font-semibold text-lg mb-2 line-clamp-2 hover:text-gray-700 transition-colors duration-200'>
                        {product.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className='flex items-center mb-4'>
                      <div className='flex mr-2'>{getRatingStars(product.rating)}</div>
                      <span className='text-gray-500 text-sm'>({product.rating})</span>
                    </div>

                    {/* Actions */}
                    <div className='space-y-3'>
                      <Link
                        to={`/product/${product.id}`}
                        className='block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center text-sm'
                      >
                        Ver Detalles
                      </Link>

                      {!isInCart
                        ? (
                          <button
                            className='w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm flex items-center justify-center gap-2'
                            onClick={() => addToCart(product)}
                          >
                            <AddToCartIcon />
                            Agregar al Carrito
                          </button>
                          )
                        : (
                          <div className='bg-white border border-gray-300 rounded-md p-2'>
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-sm font-medium text-gray-700'>En carrito:</span>
                              <span className='text-sm font-bold text-gray-900'>{quantity}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <button
                                onClick={() => decreaseFromCart(product)}
                                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded text-sm transition-colors duration-200 flex items-center justify-center'
                              >
                                <MinusIcon />
                              </button>
                              <button
                                onClick={() => addToCart(product)}
                                className='flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-3 rounded text-sm transition-colors duration-200 flex items-center justify-center'
                              >
                                <PlusIcon />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(product)}
                              className='w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded text-xs transition-colors duration-200'
                            >
                              Quitar del Carrito
                            </button>
                          </div>
                          )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
