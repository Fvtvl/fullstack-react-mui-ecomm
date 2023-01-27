import { Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { shades } from '../../styles/theme';
import { decreaseCount, increaseCount, removeFromCart } from '../../state';
import { useDispatch } from 'react-redux';
import { FlexBox } from '../../styles/FlexBox';
import { useCallback } from 'react';

const CartList = ({ cart }) => {
  const dispatch = useDispatch();
  const handleCartAction = useCallback(
    (action, id) => {
      dispatch(action({ id }));
    },
    [dispatch]
  );

  const handleRemoveFromCart = (id) => handleCartAction(removeFromCart, id);
  const handleDecreaseCount = (id) => handleCartAction(decreaseCount, id);
  const handleIncreaseCount = (id) => handleCartAction(increaseCount, id);

  return (
    <Box>
      {cart.map((item) => (
        <Box key={`${item.attributes.name} - ${item.id}`}>
          <FlexBox p="15px 0">
            <Box flex="1 1 40%">
              <img
                alt={item?.name}
                width="123px"
                height="140px"
                loading="lazy"
                src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
              />
            </Box>
            <Box flex="1 1 60%">
              {/* item name */}
              <FlexBox mb="5px">
                <Typography fontWeight="bold">
                  {item.attributes.name}
                </Typography>
                <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                  <CloseIcon />
                </IconButton>
              </FlexBox>
              <Typography>{item.attributes.shortDescription}</Typography>

              {/* amount */}
              <FlexBox m="15px 0">
                <Box
                  display="flex"
                  alignItems="center"
                  border={`1.5px solid ${shades.neutral[500]}`}
                >
                  <IconButton onClick={() => handleDecreaseCount(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.count}</Typography>
                  <IconButton onClick={() => handleIncreaseCount(item.id)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                {/* price */}
                <Typography fontWeight="bold">
                  ${item.attributes.price}
                </Typography>
              </FlexBox>
            </Box>
          </FlexBox>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default CartList;
