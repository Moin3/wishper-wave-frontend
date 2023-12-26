import React from 'react'
import Button from '@mui/material/Button';

const CustomBtn = ({label}) => {
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{  
          mt: 3,
          mb: 2 ,
          backgroundColor: '#990699',
          '&:focus': { outline: 'none' },
          '&:hover':{backgroundColor: '#b21eb2'}
        }}
    >
        {label}
    </Button>
  )
}

export default CustomBtn