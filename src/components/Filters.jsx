import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'
import { ChevronDownIcon } from './icons'

export function Filters () {
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  const { filters, setFilters } = useFilters()

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState, minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState, category: event.target.value
    }))
  }

  const categories = [
    { value: 'all', label: 'Todas las Categorías' },
    { value: 'beauty', label: 'Belleza' },
    { value: 'fragrances', label: 'Fragancias' },
    { value: 'furniture', label: 'Muebles' },
    { value: 'groceries', label: 'Comestibles' },
    { value: 'home-decoration', label: 'Decoración' },
    { value: 'kitchen-accessories', label: 'Cocina' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'mens-shirts', label: 'Camisas Hombre' },
    { value: 'mens-shoes', label: 'Zapatos Hombre' },
    { value: 'mens-watches', label: 'Relojes Hombre' },
    { value: 'mobile-accessories', label: 'Accesorios Móvil' },
    { value: 'motorcycle', label: 'Motocicletas' },
    { value: 'skin-care', label: 'Cuidado Piel' },
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'sports-accessories', label: 'Deportes' },
    { value: 'sunglasses', label: 'Gafas de Sol' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'tops', label: 'Blusas' },
    { value: 'vehicle', label: 'Vehículos' },
    { value: 'womens-bags', label: 'Bolsos Mujer' },
    { value: 'womens-dresses', label: 'Vestidos Mujer' },
    { value: 'womens-jewellery', label: 'Joyería Mujer' },
    { value: 'womens-shoes', label: 'Zapatos Mujer' },
    { value: 'womens-watches', label: 'Relojes Mujer' }
  ]

  return (
    <section className='bg-gray-50 rounded-md p-3 border border-gray-200'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
        <div className='flex items-center gap-2 min-w-0 flex-1'>
          <label
            htmlFor={minPriceFilterId}
            className='text-sm font-medium text-gray-700 whitespace-nowrap'
          >
            Precio:
          </label>
          <div className='flex items-center gap-2 flex-1 max-w-xs'>
            <input
              type='range'
              id={minPriceFilterId}
              min='0'
              max='500'
              value={filters.minPrice}
              onChange={handleChangeMinPrice}
              className='flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              style={{
                background: `linear-gradient(to right, #374151 0%, #374151 ${(filters.minPrice / 500) * 100}%, #d1d5db ${(filters.minPrice / 500) * 100}%, #d1d5db 100%)`
              }}
            />
            <span className='px-2 py-1 bg-gray-900 text-white rounded text-xs font-medium whitespace-nowrap min-w-[3rem] text-center'>
              ${filters.minPrice}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-2 min-w-0 flex-1'>
          <label
            htmlFor={categoryFilterId}
            className='text-sm font-medium text-gray-700 whitespace-nowrap'
          >
            Categoría:
          </label>
          <div className='relative flex-1 max-w-xs'>
            <select
              id={categoryFilterId}
              onChange={handleChangeCategory}
              value={filters.category}
              className='w-full appearance-none bg-white border border-gray-300 text-gray-900 rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 cursor-pointer hover:border-gray-400 text-sm'
            >
              {categories.map(category => (
                <option
                  key={category.value}
                  value={category.value}
                  className='bg-white text-gray-900'
                >
                  {category.label}
                </option>
              ))}
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
              <ChevronDownIcon className='w-4 h-4 text-gray-400' />
            </div>
          </div>
        </div>

        <button
          onClick={() => setFilters({ category: 'all', minPrice: 0 })}
          className='px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 text-sm whitespace-nowrap'
        >
          Limpiar
        </button>
      </div>
    </section>
  )
}
