import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";
import ContactMessage from "./models/ContactMessage.js";
import { AuthenticationError } from "apollo-server-errors";

const resolvers = {
  Query: {
    // Get All Users
    users: async () => {
      return await User.find();
    },

    // Get LogedIn user Info
    loggedInUser: async (_parent, _args, context) => {
      if (!context.user) throw new AuthenticationError("Not authenticated");

      const user = await User.findById(context.user.userId); // use userId from token
      if (!user) throw new AuthenticationError("User not found");

      return {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      };
    },

    // Get All Products
    products: async () => {
      return await Product.find();
    },

    productCategories: async () => {
      try {
        const products = await Product.find().select("category");
        const categories = products.map((p) => p.category);
        return Array.from(new Set(categories));
      } catch (err) {
        console.error("Error fetching categories:", err);
        return [];
      }
    },

    // Get Cart Items
    getCart: async (_, { userId, cartId }) => {
      const cart = await Cart.findOne(userId ? { userId } : { cartId });
      return cart;
    },

    // Admin all orders
    getOrders: async () => {
      return await Order.find().sort({ createdAt: -1 });
    },

    // User own orders
    getUserOrders: async (_, { userId }) => {
      return await Order.find({ userId }).sort({ createdAt: -1 });
    },

    // Single order
    getOrderById: async (_, { orderId }) => {
      return await Order.findById(orderId);
    },

    // Admin: fetch all messages
    getContactMessages: async () => {
      return await ContactMessage.find().sort({ createdAt: -1 });
    },

    // Single message
    getContactMessageById: async (_, { messageId }) => {
      return await ContactMessage.findById(messageId);
    },
  },

  Mutation: {
    //Sign-Up USer
    signupUser: async (_, { userNew }) => {
      const { fullname, email, password } = userNew;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must contain 1 uppercase, 1 lowercase, 1 number & 1 special character"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        role: "customer",
      });

      await newUser.save();

      return newUser;
    },

    // Sign-In User
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("Please SignUp First with This Email");
      }

      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Invalid Email And Password");
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return {
        token,
        role: user.role,
      };
    },

    // Logout User
    logoutUser: async (_parent, _args, context) => {
      try {
        // For JWT, logout is typically handled client-side by removing token
        if (context.res?.clearCookie) {
          context.res.clearCookie("token");
        }

        return {
          success: true,
          message: "Logged out successfully",
        };
      } catch (err) {
        return {
          success: false,
          message: "Failed to logout",
        };
      }
    },

    // Update User Role
    updateUserRole: async (_, { userId, role }) => {
      if (!["admin", "customer"].includes(role)) {
        throw new Error("Invalid role");
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    },

    // Delete User
    deleteUser: async (_, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        throw new Error("User not found");
      }

      return "User deleted successfully";
    },

    // Add Product
    addProduct: async (_, { productNew }) => {
      const id = randomBytes(5).toString("hex");

      const newProduct = new Product({
        id,
        ...productNew,
      });

      await newProduct.save();

      return newProduct;
    },

    // Add to Cart
    addToCart: async (_, { userId, cartId, item }) => {
      let cart = await Cart.findOne(userId ? { userId } : { cartId });

      if (!cart) {
        cart = new Cart({
          userId: userId || null,
          cartId: cartId || null,
          cartItems: [],
        });
      }

      const existingItem = cart.cartItems.find(
        (i) => i.productId.toString() === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        cart.cartItems.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          images: { thumbnail: item.thumbnail },
        });
      }

      await cart.save();
      return cart;
    },

    // UPDATE QUANTITY
    updateCartItem: async (_, { userId, cartId, productId, quantity }) => {
      const cart = await Cart.findOne(userId ? { userId } : { cartId });

      if (!cart) throw new Error("Cart not found");

      const item = cart.cartItems.find(
        (i) => i.productId.toString() === productId
      );

      if (!item) throw new Error("Item not found");

      item.quantity = quantity;
      await cart.save();

      return cart;
    },

    // REMOVE ITEM
    removeCartItem: async (_, { userId, cartId, productId }) => {
      const cart = await Cart.findOne(userId ? { userId } : { cartId });

      if (!cart) throw new Error("Cart not found");

      cart.cartItems = cart.cartItems.filter(
        (i) => i.productId.toString() !== productId
      );

      await cart.save();
      return cart;
    },

    // CLEAR CART
    clearCart: async (_, { userId, cartId }) => {
      await Cart.findOneAndDelete(userId ? { userId } : { cartId });
      return "Cart cleared successfully";
    },

    // Create Order
    createOrder: async (_, { userId, items, totalPrice, shippingDetails }) => {
      const order = new Order({
        userId: userId || null,
        items,
        totalPrice,
        shippingDetails,
      });

      await order.save();
      return order;
    },

    // Update Order Status (Admin)
    updateOrderStatus: async (_, { orderId, status }) => {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    },

    // Delete Order
    deleteOrder: async (_, { orderId }) => {
      const order = await Order.findByIdAndDelete(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return "Order deleted successfully";
    },

    // Add Contact Message
    addContactMessage: async (_, { contactInput }) => {
      const newMessage = new ContactMessage({
        fullName: contactInput.fullName,
        email: contactInput.email,
        subject: contactInput.subject,
        message: contactInput.message,
        createdBy: contactInput.createdBy || null,
      });

      await newMessage.save();
      return newMessage;
    },

    // Delete Message (Admin)
    deleteContactMessage: async (_, { messageId }) => {
      const deleted = await ContactMessage.findByIdAndDelete(messageId);
      if (!deleted) {
        throw new Error("Message not found");
      }
      return "Contact message deleted successfully";
    },
  },
};

export default resolvers;
