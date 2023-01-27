import React, { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../../styles/theme';
import { addToCart } from '../../state';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Item = React.memo(({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          small: { url },
        },
      },
    },
  } = image;

  const handleNavigate = useCallback(
    (id) => {
      navigate(`/item/${id}`);
    },
    [navigate]
  );
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ item: { ...item, count } }));
  }, [dispatch, count, item]);

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <LazyLoadImage
          alt={item.name}
          width="100%"
          height="100%"
          src={`http://localhost:1337${url}`}
          onClick={() => handleNavigate(item.id)}
          style={{ cursor: 'pointer' }}
          effect="blur"
        ></LazyLoadImage>
        <Box
          display={isHovered ? 'block' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* amount */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1))}>
                <AddIcon />
              </IconButton>
            </Box>

            {/*  button*/}
            <Button
              onClick={() => handleAddToCart()}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
});

export default Item;
