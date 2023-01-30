import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { shades } from '../../styles/theme';

const Footer = () => {
  const isNonMobile = useMediaQuery('(min-width: 690px');
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            FVTVL-SHOP
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
            nostrum quam nulla blanditiis voluptate libero? Debitis aliquam
            facilis iste, deserunt, unde dolor ullam dolorem nulla vel saepe ab,
            neque perspiciatis?
          </Typography>
        </Box>
        <Box display={isNonMobile ? 'block' : 'none'}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Term & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>
        <Box display={isNonMobile ? 'block' : 'none'}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Custom Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">50 cent Candy-Shop Blvd, DC 105643</Typography>
          <Typography mb="30px">Email: thisisnotrealemail@gmail.com</Typography>
          <Typography mb="30px">937-99-92</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
