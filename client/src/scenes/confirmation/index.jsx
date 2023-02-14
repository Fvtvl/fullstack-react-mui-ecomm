import { Alert, AlertTitle, Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../state';

const Confirmation = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(
    (id) => {
      dispatch(removeFromCart({ id }));
    },
    [dispatch]
  );
  cart.map((item) => handleRemoveFromCart(item.id));
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order -{' '}
        <strong>Congrats on making your purchase</strong>
      </Alert>
    </Box>
  );
};

export default React.memo(Confirmation);
