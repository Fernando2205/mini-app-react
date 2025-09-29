import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { CartProvider } from './context/cart'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { CartPage } from './pages/CartPage'

function App () {
  return (

    <CartProvider>
      <Header />
      <main className='min-h-screen bg-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
    </CartProvider>

  )
}

export default App
