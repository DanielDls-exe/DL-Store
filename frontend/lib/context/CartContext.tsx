import React, { createContext, useReducer } from 'react';
import { CartState, CartItem } from '@/types/game';

const initialState: CartState = { cartItems: [] };

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cartItems.find(item => item._id === action.item._id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.item._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, { ...action.item, quantity: 1 }] };
      }
    case 'REMOVE_ITEM': {
      // Encuentra el ítem correcto en el carrito
      const itemIndex = state.cartItems.findIndex(item => item._id === action.id);

      // Si el ítem no se encuentra, simplemente retorna el estado actual
      if (itemIndex === -1) return state;

      // Crea una copia del ítem
      const item = { ...state.cartItems[itemIndex] };

      // Reduce la cantidad en uno
      item.quantity--;

      // Si la cantidad llega a cero, filtra el ítem fuera del carrito
      if (item.quantity === 0) {
        return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.id) };
      }

      // De lo contrario, reemplaza el ítem en el carrito con la nueva cantidad
      const newCartItems = [...state.cartItems];
      newCartItems[itemIndex] = item;
      return { ...state, cartItems: newCartItems };
    }
    default: // Añade esta línea
      return state; // Y esta línea
  }
};



export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  

