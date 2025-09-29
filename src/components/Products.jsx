import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './icons'

export function Products ({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()
  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }
  return (
    <main className='flex items-center justify-center'>
      <ul className='max-w-6xl mx-auto grid grid-cols-[repeat(auto-fill,230px)] gap-4'>
        {products.slice(0, 30).map(product => {
          const isInCart = checkProductInCart(product)
          return (
            <li key={product.id} className='flex flex-col gap-4 shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] rounded bg-[#111] text-[#fff] items-center p-4'>
              <img src={product.thumbnail} alt={product.title} className='rounded w-full aspect-video block object-cover bg-[#fff]' />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  className={`p-2 rounded ${isInCart ? 'bg-red-600' : 'bg-[#09f]'}`} onClick={() => {
                    isInCart ? removeFromCart(product) : addToCart(product)
                  }}
                >
                  {isInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
