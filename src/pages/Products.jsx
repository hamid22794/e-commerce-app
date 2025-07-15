import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const Products = () => {
  //const { products: contextProducts = [] } = useProductContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Error code
  //  if (contextProducts.length === 0) {
  //      fetchProducts();
  //    } else {
  //      setProducts(contextProducts);
  //     setLoading(false);
  //    }
  //  }, [contextProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-4">Our Products</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              onClick={() => handleProductClick(product)}
            />
          </Col>
        ))}
      </Row>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Products;
