"use client";

import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addItem } from "../slices/CartSlice";
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
    } else {
      favoritedProducts.push(product.id);
      localStorage.setItem(
        "favoritedProducts",
        JSON.stringify(favoritedProducts)
      );
      // Add item to cart
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography>${product.price}</Typography>
          <Typography>{product.category}</Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <IconButton onClick={handleFavoriteClick}>
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
