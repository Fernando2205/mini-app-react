import { Filters } from './Filters'
export function Header ({ changeFilters }) {
  return (
    <header>
      <h1 className='text-center'>React Shop 🛒</h1>
      <Filters />
    </header>
  )
}
