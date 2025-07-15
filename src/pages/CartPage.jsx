import { Container } from 'react-bootstrap'
import Cart from '../components/Cart'

const CartPage = () => {
  return (
    <Container>
      <h1 className="my-4">Your Shopping Cart</h1>
      <Cart />
    </Container>
  )
}

export default CartPage