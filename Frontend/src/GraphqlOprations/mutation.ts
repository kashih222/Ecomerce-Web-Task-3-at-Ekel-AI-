import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      _id
      fullname
      email
      role
    }
  }
`;


// Sign In
export const SIGN_IN_USER = gql`
  mutation SignInUser($userSignin: UserSigninInput!) {
    signinUser(userSignin: $userSignin) {
      token
      role
    }
  }
`;


// LogOut User
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      success
      message
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: ID!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      _id
      fullname
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

// ADD TO CART
export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItems {
        _id
        productId
        name
        price
        quantity
        images {
          thumbnail
        }
      }
    }
  }
`;

// UPDATE CART ITEM
export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      cartItems {
        _id
        productId
        name
        price
        quantity
        images {
          thumbnail
        }
      }
    }
  }
`;

// REMOVE CART ITEM
export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($input: RemoveCartItemInput!) {
    removeCartItem(input: $input) {
      cartItems {
        _id
        productId
        name
        price
        quantity
        images {
          thumbnail
        }
      }
    }
  }
`;

// CLEAR CART
export const CLEAR_CART = gql`
  mutation ClearCart($input: ClearCartInput!) {
    clearCart(input: $input) {
      success
    }
  }
`;
export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $userId: ID
    $items: [OrderItemInput!]!
    $totalPrice: Float!
    $shippingDetails: ShippingInput
  ) {
    createOrder(
      userId: $userId
      items: $items
      totalPrice: $totalPrice
      shippingDetails: $shippingDetails
    ) {
      _id
      totalPrice
      status
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(
      orderId: $orderId
      status: $status
    ) {
      _id
      status
    }
  }
`;

export const SEND_CONTACT_MESSAGE = gql`
  mutation SendContactMessage($contactInput: ContactMessageInput!) {
    addContactMessage(
      contactInput: $contactInput
    ) {
      _id
      fullName
      subject
      createdAt
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($productNew: ProductInput!) {
    addProduct(productNew: $productNew) {
      _id
      name
      price
      category
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID!, $productUpdate: ProductInput!) {
    updateProduct(productId: $productId, productUpdate: $productUpdate) {
      _id
      name
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

export const DELETE_CONTACT_MESSAGE = gql`
  mutation DeleteContactMessage($messageId: ID!) {
    deleteContactMessage(messageId: $messageId)
  }
`;
