import { createContext, useState } from 'react'

// Creación del contexto
// Este es el que se consume
export const FiltersContext = createContext()

// Proveer el contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 })
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
