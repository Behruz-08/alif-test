"use client";

import { Card, CardContent, Typography, Box, IconButton, CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addItem, removeItem } from "../slices/CartSlice";
import { Product } from "../slices/ProductsSlice";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const favoritedProducts = JSON.parse(
      localStorage.getItem("favoritedProducts") || "[]"
    );
    if (favoritedProducts.includes(product.id)) {
      setIsFavorited(true);
    }
  }, [product.id]);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    const favoritedProducts = JSON.parse(
      localStorage.getItem("favoritedProducts") || "[]"
    );

    if (favoritedProducts.includes(product.id)) {
      const updatedFavorites = favoritedProducts.filter(
        (id: number) => id !== product.id
      );
      localStorage.setItem(
        "favoritedProducts",
        JSON.stringify(updatedFavorites)
      );
  
      dispatch(removeItem(product.id));
    } else {
      favoritedProducts.push(product.id);
      localStorage.setItem(
        "favoritedProducts",
        JSON.stringify(favoritedProducts)
      );
      // Добавляем товар в корзину
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  return (
    <Card
    sx={{
      minWidth: 300,
      minHeight:600,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius:"1rem"
    }}
    >

<CardMedia
        component="img"
        sx={{ width: "70%", height: 300, objectFit: "cover" , padding:"1rem"}}
        image={product.image}
        alt={product.title}
      />



      <Box>
        <CardContent>
       
          <Typography variant="h6">{product.title}</Typography>
          <Typography>${product.price}</Typography>
          <Typography>{product.category}</Typography>
     

        </CardContent>
      </Box>
      <Box
        sx={{
          position:"relative",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
         
        }}
      >
        <IconButton  onClick={handleFavoriteClick}>
          {isFavorited ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
