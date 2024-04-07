import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useLocation } from 'react-router-dom';

const buttons = [
  { label: 'Sign In', path: '/signin' },
  { label: 'Sign Up', path: '/signup' }
];

export default function GroupSizesColors() {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="medium" aria-label="small button group">
        {buttons.map(({ label, path }) => (
          <Link key={path} to={path}>
            <Button
              sx={{
                '&:hover': { backgroundColor: location.pathname === path ? '#577799' : 'inherit' },
                backgroundColor: location.pathname === path ? '#577799' : 'inherit',
                color: location.pathname === path ? '#ffffff' : 'black'
              }}
            >
              {label}
            </Button>
          </Link>
        ))}
      </ButtonGroup>
    </Box>
  );
}


