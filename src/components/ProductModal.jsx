import { Modal, Button, Image } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";

const ProductModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart();
  const { addCartProduct } = useProductContext();

  const handleAddToCart = () => {
    addToCart(product);
    addCartProduct(product);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column flex-md-row gap-4">
          <div className="flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          </div>
          <div>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;