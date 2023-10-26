//Rutas y logica relacionada con los carritos
const express = require('express');
const cartsRouter = express.Router();
const dataAccess = require('./dataAccess');

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

module.exports = cartsRouter;