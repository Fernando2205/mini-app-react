import { Link, useLocation } from 'react-router-dom'
import { Filters } from './Filters'
import { ShoppingCartLogoIcon } from './icons'

export function Header () {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between py-2'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center space-x-2 text-lg font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200'
          >
            <ShoppingCartLogoIcon className='w-6 h-6 text-gray-700' />
            <span className='hidden sm:block'>ReactShop</span>
          </Link>

          {/* Navigation */}
          <nav className='flex items-center space-x-1'>
            <Link
              to='/'
              className={`px-3 py-1 rounded-md font-medium text-sm transition-all duration-200 ${
                isHome
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Productos
            </Link>
            <Link
              to='/cart'
              className={`px-3 py-1 rounded-md font-medium text-sm transition-all duration-200 ${
                location.pathname === '/cart'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Carrito
            </Link>
          </nav>
        </div>

        {/* Filters Section */}
        {isHome && (
          <div className='border-t border-gray-100 py-2'>
            <Filters />
          </div>
        )}
      </div>
    </header>
  )
}
