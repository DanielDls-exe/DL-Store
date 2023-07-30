import CartCard from '../../components/games/CartCard'; // Asegúrate de importar el nuevo componente
import { useContext } from 'react';
import { CartContext } from '../../lib/context/CartContext';

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const handleAddItem = (id) => {
    const itemToAdd = state.cartItems.find((item) => item._id === id);
    if (itemToAdd) {
      dispatch({ type: 'ADD_ITEM', item: itemToAdd });
    }
  };

  const total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {state.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {state.cartItems.map((item, index) => (
            <CartCard key={index} item={item} onRemove={handleRemoveItem} onAdd={handleAddItem} />
          ))}
          <div>Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
};

export default CartPage;
