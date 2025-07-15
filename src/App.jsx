import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import Products from './pages/Products'
import CartPage from './pages/CartPage'
import CartLink from './components/CartLink'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <CartLink />
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Products/>} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  )
};
export default App;