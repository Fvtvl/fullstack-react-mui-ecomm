import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

const Subscribe = React.memo(() => {
  const [email, setEmail] = useState('');

  const handleChange = useCallback((e) => setEmail(e.currentTarget.value), []);

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={handleChange}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Typography sx={{ p: '10px', ':hover': { cursor: 'pointer' } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
});

export default Subscribe;
