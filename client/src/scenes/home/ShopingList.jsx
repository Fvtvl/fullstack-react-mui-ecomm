import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import useHomeFetch from '../../hooks/useHomeFetch';
import { API_URL } from '../../config';

const ShoppingList = React.memo(() => {
  const {
    items,
    loading,
    error,
    bestSellersItems,
    newArrivalsItems,
    topRatedItems,
  } = useHomeFetch(API_URL);
  const [value, setValue] = useState('all');
  const isNonMobile = useMediaQuery('(min-width: 690px');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (error) return <div>Something went wrong...</div>;

  return (
    <Box width="90%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        justifyContent="space-around"
        rowGap="20px"
        sx={{
          display: 'grid',
          gridTemplateColumns: isNonMobile
            ? 'repeat(auto-fill, 300px)'
            : '1fr 1fr',
          columnGap: isNonMobile ? '1.33%' : '20px',
        }}
      >
        {value === 'all' &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'newArrivals' &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'bestSellers' &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'topRated' &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
});

export default ShoppingList;
