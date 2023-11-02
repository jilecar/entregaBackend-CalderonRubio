//Rutas y logica relacionada con los carritos

import express from 'express';
import cartsRouter from express.Router();
import dataAccess from './dataAccess.js';

// Define rutas para carritos
cartsRouter.post('/', (req, res) => {
  const carts = dataAccess.readData('carrito.json');
  const newCart = {
    id: dataAccess.generateUniqueID(carts),
    products: [],
  };
  carts.push(newCart);
  dataAccess.writeData('carrito.json', carts);
  res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
  const carts = dataAccess.readData('carrito.json');
  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  } else {
    res.json(cart.products);
  }
});

cartsRouter.post('/:cid/products/:pid', (req, res) => {
  const carts = dataAccess.readData('carrito.json');
  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  } else {
    const { pid } = req.params;
    const { quanty } = req.body;

    const productIndex = cart.products.findIndex((p) => p.product === pid);
    if (productIndex === -1) {
      // El producto no está en el carrito, agregarlo
      cart.products.push({ product: pid, quanty: quanty });
    } else {
      // El producto ya está en el carrito, incrementar la cantidad
      cart.products[productIndex].quanty += quanty;
    }

    dataAccess.writeData('carrito.json', carts);
    res.json(cart);
  }
});

export default cartsRouter;