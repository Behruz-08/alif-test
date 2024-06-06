"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 , textTransform:'uppercase', fontSize:"1.5rem"}}>
          navbar
        </Typography>
        <Button color="inherit"  style={{  textTransform:'uppercase', fontSize:"1.3rem"}} component={Link} href="/">
          Home
        </Button>
        <Button color="inherit"  style={{  textTransform:'uppercase', fontSize:"1.3rem"}} component={Link} href="/cart">
        Корзина
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
