//Rutas y logica relacionada con los productos

const express = require('express');
const productsRouter = express.Router();
const dataAccess = require('./dataAccess');

// Define rutas para productos
productsRouter.get('/', (req, res) => {
    const products = dataAccess.readData('productos.json');
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

module.exports = productsRouter;