const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

//get cart items
router.get('/cart/:id',cartController.get_cart_items);

// Add item to the cart
router.post('/cart/:id',cartController.get_cart_items);

//delete items from the cart.

router.delete('/cart/:userId/:itemId',cartController.delete_item);



module.exports = router;