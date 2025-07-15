import { Badge } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";

const CartLink = () => {
  const { totalItems } = useCart()

  return (
    <Link to="/cart" className="cart-icon-link">
      <IoCartOutline size={30} className="cart-icon" />
      {totalItems > 0 && (
        <Badge bg="danger" className="cart-badge">
          {totalItems}
        </Badge>
      )}
    </Link>
  )
}

export default CartLink