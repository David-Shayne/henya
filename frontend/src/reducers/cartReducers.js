import {
  CART_ADD_ITEM,
  CART_REMOVE_ALL_ITEMS,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING
} from '../constants/cartConstants';

//Sets cart to last cart from browser if available
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//Sets shipping data to last shipping from browser if available
const shippingFromStorage = localStorage.getItem('shipping')
  ? JSON.parse(localStorage.getItem('shipping'))
  : { address: '', postalCode: '' };

//Sets payment method to last method from browser if available
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const initialState = {
  cartItems: cartItemsFromStorage,
  item: {},
  shipping: shippingFromStorage,
  paymentMethod: paymentMethodFromStorage
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const newItem = payload;
      //Returns true if the item is already in the cart
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existItem) {
        return {
          ...state,
          // Updates existing item with newItem data
          cartItems: state.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        };
      } else {
        //Pushes the newItem to the cart list
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== payload)
      };
    case SAVE_SHIPPING:
      return { ...state, shipping: payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };
    case CART_REMOVE_ALL_ITEMS:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
