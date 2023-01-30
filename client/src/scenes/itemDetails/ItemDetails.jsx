import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shades } from '../../styles/theme';
import { addToCart } from '../../state';
import Item from '../../components/Item';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import useHomeFetch from '../../hooks/useHomeFetch';
import { API_URL } from '../../config';
import { useItemFetch } from '../../hooks/useItemFetch';
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Spinner from '../../components/Spiner';

const ItemDetails = React.memo(() => {
  const { item, loading, error } = useItemFetch();
  const { items } = useHomeFetch(API_URL);
  const dispatch = useDispatch();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ item: { ...item, count } }));
  }, [dispatch, count, item]);
  if (loading) return <Spinner />;
  if (error)
    return <Typography variant="h3">Something went wrong...</Typography>;
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* images */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
            style={{ objectFit: 'contain' }}
          />
        </Box>
        {/* actions */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev/Next</Box>
          </Box>

          <Box m="65px 0 25px 0 ">
            <Typography variant="h2">{item?.attributes?.name}</Typography>
            <Typography variant="h3">${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* count and button */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1))}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.primary[300],
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
                ':hover': { backgroundColor: shades.primary[800] },
              }}
              onClick={() => handleAddToCart()}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>
              CATEGORIES:{' '}
              {item?.attributes?.category
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* information */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === 'description' && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

      {/* related items */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="noWrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, index) => (
            <Item key={`${item.name}-${index}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
});

export default ItemDetails;
