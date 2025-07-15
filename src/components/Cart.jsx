import { Table, Button, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    subtotal,
    clearCart,
  } = useCart();
  const { updateProductQuantity, removeCartProduct, clearCartProducts } =
    useProductContext();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    removeCartProduct(productId);
  };

  const handleIncrementQuantity = (productId) => {
    incrementQuantity(productId);
    const item = cart.find((item) => item.id === productId);
    updateProductQuantity(productId, item.quantity + 1);
  };

  const handleDecrementQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item.quantity > 1) {
      decrementQuantity(productId);
      updateProductQuantity(productId, item.quantity - 1);
    }
  };

  const handleClearCart = () => {
    clearCart();
    clearCartProducts();
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <span>{item.title}</span>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    size="sm"
                    onClick={() => handleDecrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() => handleIncrementQuantity(item.id)}
                  >
                    +
                  </Button>
                </Stack>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-end fw-bold">
              Total:
            </td>
            <td colSpan={2} className="fw-bold">
              ${subtotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
        <Button variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button variant="success">Checkout</Button>
      </div>
    </>
  );
};

export default Cart;
