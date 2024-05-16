import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Input, Select, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../ProductContext/ProductContext';
import './index.css';

const { Option } = Select;

const ProductListPage = () => {
  const { products, setProducts } = useContext(ProductContext);
  
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];
    setCategories(categories);
    setFilteredProducts([...products]);
    setTotalProducts(products.length);
    setUniqueCategories(categories.length);
  }, [products]);

  const filterProducts = (name, description, category) => {
    let filtered = [...products];

    if (name) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (description) {
      filtered = filtered.filter(product => product.description.toLowerCase().includes(description.toLowerCase()));
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleSearchNameChange = (value) => {
    setSearchName(value);
    filterProducts(value, searchDescription, selectedCategory);
  };

  const handleSearchDescriptionChange = (value) => {
    setSearchDescription(value);
    filterProducts(searchName, value, selectedCategory);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    filterProducts(searchName, searchDescription, value);
  };

  const handleEditProduct = (productId) => {
    const selectedProd = products.find(product => product.id === productId); // Find selected product
    setSelectedProduct(selectedProd); // Set selected product data for modal
    setEditModalVisible(true);
  };

  const handleDeleteProduct = (productId) => {
    const productToDelete = products.find(product => product.id === productId);
    setSelectedProduct(productToDelete);
    setDeleteModalVisible(true);
  };

  const confirmDeleteProduct = () => {
    if (!selectedProduct) {
      return;
    }
    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setDeleteModalVisible(false);
  };

  const handleUpdateProduct = (updatedValues) => {
    const updatedProducts = filteredProducts.map(product =>
      product.id === selectedProduct.id ? { ...product, ...updatedValues } : product
    );
    setFilteredProducts(updatedProducts); // Update filteredProducts state
    setEditModalVisible(false);
  };

  const renderActions = (text, record) => (
    <div>
      <Button className="button-tab" onClick={() => handleEditProduct(record.id)}>Edit</Button>
      <Button className="button-tab" onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
    </div>
  );

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderActions,
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };

  return (
    <div className="product-list-page">
      <div className="header">
        <h1>Product Management Pro</h1>
        <p>Total Products: {totalProducts} | Unique Categories: {uniqueCategories}</p>
      </div>
      <div className="filters">
        <Input.Search placeholder="Search Name" value={searchName} onChange={(e) => handleSearchNameChange(e.target.value)} />
        <Input.Search placeholder="Search Description" value={searchDescription} onChange={(e) => handleSearchDescriptionChange(e.target.value)} />
        <Select defaultValue="All Categories" onChange={handleCategoryChange}>
          <Option value="">All Categories</Option>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>
      <div className="product-table">
        <Table dataSource={filteredProducts} columns={columns} rowClassName={rowClassName} />
      </div>
      <div className="add-product-button">
        <Button size="medium" onClick={() => history.push('/add-product')}>Add Product</Button>
      </div>
      <Modal title="Edit Product" visible={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null}>
        <Form
          name="editProductForm"
          initialValues={selectedProduct} 
          onFinish={values => handleUpdateProduct(values)}
        >
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>
          <Button key="update" type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
      <Modal title="Delete Product" visible={deleteModalVisible} onCancel={() => setDeleteModalVisible(false)} footer={null}>
        <p>Are you sure you want to delete this product?</p>
        <Button size="medium" onClick={() => confirmDeleteProduct()} type="primary">Yes</Button>
        <Button size="medium" onClick={() => setDeleteModalVisible(false)}>No</Button>
      </Modal>
    </div>
  );
};

export default ProductListPage;
