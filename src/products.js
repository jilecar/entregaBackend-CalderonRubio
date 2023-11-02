//Rutas y logica relacionada con los productos

import express from 'express';
const productsRouter = express.Router();
import dataAccess from './dataAccess.js';

// Define rutas para productos
productsRouter.get('/', (req, res) => {
  const products = dataAccess.readData('./productos.json');
  res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
  const products = dataAccess.readData('productos.json');
  const product = products.find((p) => p.id === req.params.pid);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    res.json(product);
  }
});

productsRouter.post('/', (req, res) => {
  const products = dataAccess.readData('productos.json');
  const newProduct = {
    id: dataAccess.generateUniqueID(products),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
  };
  products.push(newProduct);
  dataAccess.writeData('productos.json', products);
  res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const products = dataAccess.readData('productos.json');
  const productIndex = products.findIndex((p) => p.id === req.params.pid);
  if (productIndex === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    dataAccess.writeData('productos.json', products);
    res.json(updatedProduct);
  }
});

productsRouter.delete('/:pid', (req, res) => {
  const products = dataAccess.readData('productos.json');
  const productIndex = products.findIndex((p) => p.id === req.params.pid);
  if (productIndex === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    products.splice(productIndex, 1);
    dataAccess.writeData('productos.json', products);
    res.json({ message: 'Producto eliminado exitosamente' });
  }
});

export default productsRouter;