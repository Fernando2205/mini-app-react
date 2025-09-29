// import { useState } from 'react'
import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useFilters () {
  // const [filters, setFilters] = useState({ category: 'all', minPrice: 0 })
  const { filters, setFilters } = useContext(FiltersContext)

  // Mostrar productos de acuerdo a los filtros
  const filterProducts = (products) => {
    return (products.filter(product => {
      return (product.price >= filters.minPrice && (filters.category === 'all' || product.category === filters.category))
    }).sort((a, b) => a.price - b.price)) // Ordenar de menor a mayor precio
  }

  return { filterProducts, filters, setFilters }
}
