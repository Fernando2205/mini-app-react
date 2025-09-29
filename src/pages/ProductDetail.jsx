import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon, ArrowLeftIcon, StarIcon } from '../components/icons'

export function ProductDetail () {
  const { id } = useParams()
  const { products, loading, error } = useProducts()
  const { addToCart, removeFromCart, cart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4' />
          <div className='text-gray-900 text-xl'>Cargando producto...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-600 text-xl mb-4'>Error: {error}</div>
          <Link
            to='/'
            className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-colors duration-200'
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6'>
        <div className='text-gray-900 text-2xl font-bold'>Producto no encontrado</div>
        <Link
          to='/'
          className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-md transition-colors duration-200'
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  const isInCart = cart.some(item => item.id === product.id)
  const images = product.images || [product.thumbnail]

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        filled={index < Math.floor(rating)}
      />
    ))
  }

  const getStockStatus = (stock) => {
    if (stock > 50) return { text: 'En Stock', color: 'text-green-600', bg: 'bg-green-50' }
    if (stock > 10) return { text: 'Pocas Unidades', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { text: 'Últimas Unidades', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group'
          >
            <ArrowLeftIcon className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200' />
            Volver a productos
          </Link>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12'>
            {/* Images Section */}
            <div className='space-y-6'>
              {/* Main Image */}
              <div className='relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200'>
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className='w-full h-96 object-cover'
                />
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className='grid grid-cols-4 gap-3'>
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg transition-all duration-200 border-2 ${
                        selectedImage === index
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className='w-full h-20 object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className='space-y-8'>
              {/* Header */}
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <span className='inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium uppercase tracking-wide rounded-full'>
                    {product.category}
                  </span>
                  <div className={`px-3 py-1 ${stockStatus.bg} ${stockStatus.color} text-sm font-medium rounded-full border`}>
                    {stockStatus.text}
                  </div>
                </div>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>{product.title}</h1>
                <p className='text-gray-600 text-lg leading-relaxed'>{product.description}</p>
              </div>

              {/* Price */}
              <div className='flex items-baseline gap-4'>
                <span className='text-4xl font-bold text-gray-900'>
                  ${product.price}
                </span>
                <span className='text-gray-500 text-lg'>USD</span>
              </div>

              {/* Rating */}
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='flex'>
                    {renderStarRating(product.rating)}
                  </div>
                  <span className='text-gray-900 font-medium'>{product.rating}</span>
                  <span className='text-gray-500'>de 5</span>
                </div>
              </div>

              {/* Product Details */}
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <span className='text-gray-500 text-sm'>Marca</span>
                    <p className='text-gray-900 font-medium'>{product.brand}</p>
                  </div>
                  <div>
                    <span className='text-gray-500 text-sm'>Stock disponible</span>
                    <p className='text-gray-900 font-medium'>{product.stock} unidades</p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <span className='text-gray-500 text-sm'>SKU</span>
                    <p className='text-gray-900 font-medium'>{product.sku || 'N/A'}</p>
                  </div>
                  <div>
                    <span className='text-gray-500 text-sm'>Peso</span>
                    <p className='text-gray-900 font-medium'>{product.weight || 'N/A'} kg</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='space-y-4'>
                <button
                  className={`w-full py-4 px-8 rounded-md font-medium text-lg transition-colors duration-200 flex items-center justify-center gap-3 ${
                    isInCart
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  onClick={() => {
                    isInCart ? removeFromCart(product) : addToCart(product)
                  }}
                >
                  {isInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                  {isInCart ? 'Quitar del Carrito' : 'Agregar al Carrito'}
                </button>

                <div className='grid grid-cols-2 gap-4'>
                  <button className='py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-md transition-colors duration-200 border border-gray-200'>
                    Favoritos
                  </button>
                  <button className='py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-md transition-colors duration-200 border border-gray-200'>
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
