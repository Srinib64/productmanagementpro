import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { ProductContext } from '../ProductContext/ProductContext';
import './index.css';

const { Option } = Select;

const AddProductPage = ({ products, setProducts }) => {
  const [form] = Form.useForm();
  const { addProduct } = useContext(ProductContext);
  const history = useHistory();

  const onFinish = (values) => {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the new product
      ...values,
    };
    addProduct(newProduct); // Add the new product to the context
    history.push('/product-list');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add-product-page">
      <h1>Add Product</h1>
      <Form
        form={form}
        name="addProductForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category">
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Home & Kitchen">Home & Kitchen</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name!' }]}
        >
          <Input placeholder="Enter the product name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the product description!' }]}
        >
          <Input.TextArea placeholder="Enter the product description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the product price!' }]}
        >
          <Input type="number" placeholder="Enter the product price" />
        </Form.Item>
        <Form.Item>
          <Button size="medium" type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
