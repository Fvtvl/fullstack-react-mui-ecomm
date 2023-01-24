import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import { shades } from '../../styles/theme';
import {
  SearchOutlined,
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import { setIsCartOpen } from '../../state';

const Navbar = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCartOpen = useCallback(() => {
    dispatch(setIsCartOpen({}));
  }, [dispatch]);

  const badgeContent = useMemo(() => cart.length, [cart]);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        display="flex"
        width="80%"
        margin="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={handleClick}
          sx={{
            '&:hover': { cursor: 'pointer' },
          }}
          color={shades.secondary[500]}
        >
          FVTVL-SHOP
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <PersonOutlined />
          </IconButton>
          <Badge
            badgeContent={badgeContent}
            color="secondary"
            invisible={badgeContent === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: ' 0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton onClick={handleCartOpen} sx={{ color: 'black' }}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default Navbar;
