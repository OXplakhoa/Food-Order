import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = [...state.items];
      const itemIndex = updatedItems.findIndex(
        (item) => item.id === action.item.id
      );

      if (itemIndex > -1) {
        updatedItems[itemIndex].quantity += 1;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      const itemsAfterRemoval = state.items
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return { ...state, items: itemsAfterRemoval };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(CartReducer, { items: [] });

  const addItem = (item) => dispatchCartAction({ type: "ADD_ITEM", item });
  const removeItem = (id) => dispatchCartAction({ type: "REMOVE_ITEM", id });

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };
  console.log(cart);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
