import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './Component/ProductListPage';
import AddProductPage from './Component/AddProductPage';
import { ProductProvider } from './Component/ProductContext/ProductContext';

const App = () => {
  return (
    <Router>
      <ProductProvider> {/* Wrap components with ProductProvider */}
        <div>
          <Switch>
            <Route path="/product-list">
              <ProductListPage />
            </Route>
            <Route path="/add-product">
              <AddProductPage />
            </Route>
            <Route exact path="/">
              <ProductListPage />
            </Route>
          </Switch>
        </div>
      </ProductProvider>
    </Router>
  );
};

export default App;
