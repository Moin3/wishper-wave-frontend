import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Developed by '}
                    <Link color="inherit" href="https://dev-moin.vercel.app/">
                    © DevMoin
                    </Link>{' '}
                {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
  }
  
  export default Copyright