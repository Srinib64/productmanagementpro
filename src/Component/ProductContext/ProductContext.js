// ProductContext.js
import React, { createContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([
        { id: 1, category: 'Electronics', name: 'Laptop', description: 'High-performance laptop', price: 49999 },
        { id: 2, category: 'Books', name: 'My Life', description: 'Novel', price: 785 },
        { id: 3, category: 'Electronics', name: 'Tablet', description: 'Lightweight tablet', price: 10000 },
        { id: 4, category: 'Electronics', name: 'Smartwatch', description: 'Fitness tracker smartwatch', price: 3500 },
        { id: 5, category: 'Clothing', name: 'ZARA', description: 'Pant', price: 2999 }
      ]);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products,setProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
