import { useCart } from '../hooks/useCart'
import { ClearCartIcon, CartIcon } from './icons'
import { useId } from 'react'

function CartItem ({ thumbnail, title, price, quantity, addToCart }) {
  return (
    <li className=' border-b border-b-[#444] pb-4'>
      <img src={thumbnail} alt={`Foto de ${title}`} className='aspect-video w-full' />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer className='flex gap-2 justify-center items-center'>
        <small>
          Qty:{quantity}
        </small>
        <button className='p-2' onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()
  return (
    <>
      <label className='cart-button items-center bg-[#09f] rounded-full cursor-pointer flex h-8 justify-center p-2 absolute right-2 top-2 transition-all w-8 z-[9999] hover:scale-110' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden className='peer' />
      <aside className='cart bg-[#000] hidden p-8 fixed right-0 top-0 w-[200px] peer-checked:h-full peer-checked:block'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button className='p-2 rounded bg-red-600' onClick={clearCart}><ClearCartIcon /></button>
      </aside>
    </>
  )
}
