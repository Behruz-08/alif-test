"use client";

import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeItem, clearCart } from '../slices/CartSlice';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.title} - $${item.price} x ${item.quantity}`}
                />
                {/* <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button> */}

                <DeleteRoundedIcon  onClick={() => handleRemoveItem(item.id)}/>
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClearCart}>Clear Cart</Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
