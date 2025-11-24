const express = require("express");
const Cart = require("../Model/Cart");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

// Add to Cart
router.post("/add-to-cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, cartItems: [] });

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Cart
// Get Cart
router.get("/get-cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");

    if (!cart) {
      return res.json({ cartItems: [] });
    }

    // Map cartItems to the format frontend expects
    const cartItems = cart.cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      name: item.productId.name,
      price: item.productId.price,
      images: { thumbnail: item.productId.images[0] }, // adjust if images is an array
    }));

    res.json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update Quantity
router.post("/update-qty", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.cartItems.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove Item
router.post("/remove-item", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { cartItems: { productId } } },
      { new: true }
    );

    res.json({ message: "Item removed", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
