import React from 'react'
import Button from '@mui/material/Button';

const CustomBtn = ({label,isLoading}) => {
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{  
          mt: 3,
          mb: 2 ,
          backgroundColor: '#577799',
          '&:focus': { outline: 'none' },
          '&:hover':{backgroundColor: '#577485'}
        }}
    >
        {isLoading ? "Loading..." : label}
    </Button>
  )
}

export default CustomBtn