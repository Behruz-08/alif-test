"use client";

import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeItem, clearCart } from '../slices/CartSlice';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { red } from '@mui/material/colors';
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
      <Typography variant="h4" gutterBottom>Ваши товари</Typography>
      {items.length === 0 ? (
        <Typography>Ваша корзина пуста.</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.title} - $${item.price} x ${item.quantity}`}
                />
                {/* <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button> */}

                <DeleteRoundedIcon sx={{color:red[500]}} onClick={() => handleRemoveItem(item.id)}/>
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClearCart}>Очистит корзину</Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
