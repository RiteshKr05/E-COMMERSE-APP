

const Cart = require("../models/Cart");
const Item = require("../models/Item");

module.exports.get_cart_items = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_to_cart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });

    if (!item) {
      res.status(404).json("The product was not found");
    }
    const price = item.price;
    const name = item.title;

    if (cart) {
      //if cart exists for user
      let itemIndex = cart.items.findIndex((p) => p.productId === productId);

      if (itemIndex > -1) {
        //the item is already in the cart so we just need to update its quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        card.Item[itemIndex] = productItem;
      } else {
        card.items.push({ productId, name, quantity, price });
      }
      card.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(card);
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

module.exports.delete_item = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in deleting the Item");
  }
};
