import { Badge } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";

const CartLink = () => {
  const { totalItems } = useCart()

  return (
    <Link to="/cart" className="nav-link position-relative">
      <IoCartOutline size={30} 
      />
      {totalItems > 0 && (
        <Badge
          pill
          bg="danger"
          className="position-absolute top-0"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  )
}

export default CartLink