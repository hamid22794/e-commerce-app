import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addCartProduct = (product) => {
    setCartProducts((previous) => {
      const existingProduct = previous.find((item) => item.id === product.id);
      if (existingProduct) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const removeCartProduct = (productId) => {
    setCartProducts((previous) => previous.filter((item) => item.id !== productId));
  };

  const updateProductQuantity = (productId, quantity) => {
    setCartProducts((previous) =>
      previous.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCartProducts = () => {
    setCartProducts([]);
  };

  const getProductQuantity = (productId) => {
    const product = cartProducts.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <ProductContext.Provider
      value={{
        cartProducts,
        addCartProduct,
        removeCartProduct,
        updateProductQuantity,
        clearCartProducts,
        getProductQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("Error in Product Context");
  }
  return context;
};