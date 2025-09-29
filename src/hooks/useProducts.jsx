import { useState, useEffect } from 'react'
import axios from 'axios'

export function useProducts () {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get('https://dummyjson.com/products?limit=194')
        setProducts(response.data.products)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
