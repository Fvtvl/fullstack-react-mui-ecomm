import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  useMediaQuery,
  Button,
} from '@mui/material';
import Item from '../Item';
import useHomeFetch from '../../hooks/useHomeFetch';
import Spinner from '../Spiner';
import { setPage } from '../../state';
import { useDispatch } from 'react-redux';
import { shades } from '../../styles/theme';

const ShoppingList = React.memo(() => {
  const {
    items,
    setIsLoadingMore,
    loading,
    error,
    bestSellersItems,
    newArrivalsItems,
    topRatedItems,
  } = useHomeFetch();
  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const isNonMobile = useMediaQuery('(min-width: 690px');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLoadMore = useCallback(() => {
    dispatch(setPage());
    setIsLoadingMore(true);
  }, [dispatch, setIsLoadingMore]);

  if (error)
    return <Typography variant="h3">Something went wrong...</Typography>;

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
      {loading && <Spinner />}
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
      {items.length >= 12 && loading && <Spinner />}
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Button
          sx={{
            backgroundColor: shades.primary[400],
            ':hover': { backgroundColor: shades.primary[800] },
            color: 'white',
            borderRadius: 0,
            padding: '10px 10px',
            m: '20px 0',
          }}
          onClick={() => {
            handleLoadMore();
          }}
        >
          Load more products
        </Button>
      </Box>
    </Box>
  );
});

export default ShoppingList;
