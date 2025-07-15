import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { getProductQuantity, addCartProduct } = useProductContext();
  const quantity = getProductQuantity(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    addCartProduct(product);
  };

  return (
    <Card onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '200px', objectFit: 'contain', padding: '20px' }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: '16px' }}>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart {quantity > 0 ? `(${quantity})` : ''}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;