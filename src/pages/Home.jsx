import { Products } from '../components/Products'
import { useProducts } from '../hooks/useProducts'
import { useFilters } from '../hooks/useFilters'
import { ExclamationCircleIcon, SearchIcon } from '../components/icons'

export function Home () {
  const { products, loading, error } = useProducts()
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center space-y-6'>
          {/* Animated Loading Spinner */}
          <div className='relative'>
            <div className='w-20 h-20 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto' />
          </div>

          {/* Loading Text */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Cargando productos...
            </h2>
            <p className='text-gray-600'>Preparando la mejor selección para ti</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-md mx-auto px-4'>
          {/* Error Icon */}
          <div className='mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center'>
            <ExclamationCircleIcon className='w-12 h-12 text-red-600' />
          </div>

          {/* Error Message */}
          <div className='space-y-3'>
            <h2 className='text-2xl font-bold text-gray-900'>¡Oops! Algo salió mal</h2>
            <p className='text-red-600 font-semibold'>{error}</p>
            <p className='text-gray-600'>No pudimos cargar los productos. Por favor, intenta nuevamente.</p>
          </div>

          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-semibold transition-colors duration-200'
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className='min-h-screen bg-white'>
        <div className='flex items-center justify-center pt-32'>
          <div className='text-center space-y-6 max-w-md mx-auto px-4'>
            {/* Empty State Icon */}
            <div className='mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center'>
              <SearchIcon className='w-16 h-16 text-gray-400' />
            </div>

            {/* Empty Message */}
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold text-gray-900'>No encontramos productos</h2>
              <p className='text-gray-600 text-lg'>
                No hay productos que coincidan con tus filtros actuales.
              </p>
            </div>

            {/* Suggestions */}
            <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
              <h3 className='text-gray-900 font-semibold mb-3'>Sugerencias:</h3>
              <ul className='text-gray-600 text-sm space-y-2 text-left'>
                <li>• Ajusta el rango de precio</li>
                <li>• Cambia la categoría seleccionada</li>
                <li>• Limpia todos los filtros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <Products products={filteredProducts} />
}
