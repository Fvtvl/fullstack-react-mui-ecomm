import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { shades } from '../../styles/theme';
import { setIsCartOpen } from '../../state';
import { useNavigate } from 'react-router-dom';
import CartList from './CartList';
import { FlexBox } from '../../styles/FlexBox';

const CartMenu = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const handleCartOpen = useCallback(() => {
    dispatch(setIsCartOpen({}));
  }, [dispatch]);

  const handleNavigate = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  const totalPrice = useMemo(
    () =>
      cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
      }, 0),
    [cart]
  );

  return (
    <Box //overlay
      display={isCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {/* modal */}

      <Box
        position="fixed"
        right="0"
        bottom="0"
        // width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={() => handleCartOpen()}
          // PaperProps={{
          //   sx: {
          //     width: '400px',
          //   },
          // }}
        >
          <Box
            padding="30px"
            overflow="auto"
            height="100%"
            sx={{ width: isNonMobile ? '400px' : '100vw' }}
          >
            {/* header */}
            <FlexBox mb="15px">
              <Typography variant="h3">SHOPING BAG ({cart.length})</Typography>
              <IconButton onClick={() => handleCartOpen()}>
                <CloseIcon />
              </IconButton>
            </FlexBox>

            {/* cart list */}
            <CartList cart={cart} />

            {/* actions */}
            <Box m="20px 0">
              <FlexBox m="20px 0">
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">${totalPrice}</Typography>
              </FlexBox>
              <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  ':hover': { backgroundColor: shades.primary[800] },
                  color: 'white',
                  borderRadius: 0,
                  minWidth: '100%',
                  padding: '20px 40px',
                  m: '20px 0',
                }}
                onClick={() => {
                  handleNavigate();
                  handleCartOpen();
                }}
              >
                CHECKOUT
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default React.memo(CartMenu);
