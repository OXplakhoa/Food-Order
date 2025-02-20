const { createContext } = require("react");

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {},
})

const CartReducer = (state,action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingCartItemIdx = state.items.findIndex(
                (idx) => idx.id === action.item.id
            );
            const updatedItems = [...state.items];
            if (existingCartItemIdx > -1){
                const existingItem = state.items[existingCartItemIdx];
                const updatedItem = {...existingItem, quantity: existingItem.quantity + 1};
            }
        
            
        default:
            break;
    }
}