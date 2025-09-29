import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  // Generar un id único para los inputs
  // Esto es útil para asociar etiquetas con inputs
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  // Obtener los filtros y la función para actualizarlos
  const { filters, setFilters } = useFilters()

  // Manejar el cambio del precio mínimo
  // y la categoría seleccionada
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
  return (
    <section className='flex items-center justify-between [&>div]:flex [&>div]:gap-4'>
      <div>
        <label htmlFor={minPriceFilterId}>Starting price</label>
        <input type='range' id={minPriceFilterId} min='0' max='500' defaultValue='0' onChange={handleChangeMinPrice} value={filters.minPrice} />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category </label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='beauty'>Beauty</option>
          <option value='groceries'>Groceries</option>
          <option value='fragrances'>Fragances</option>

        </select>
      </div>
    </section>
  )
}
