import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { shades } from '../../styles/theme';
import {
  SearchOutlined,
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgraundColor="rgba(255,255,255,0.95)"
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
          onClick={() => navigate('/')}
          sx={{
            '&:hover': { cursor: 'pointer' },
          }}
          color={shades.secondary[500]}
        >
          Fvtvl-shop
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
          <IconButton sx={{ color: 'black' }}>
            <ShoppingBagOutlined />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
