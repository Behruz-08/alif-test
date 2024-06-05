"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../slices/ProductsSlice";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";

import { Container, Grid, Pagination, Box, Typography } from "@mui/material";
import { Product } from "@/slices/ProductsSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Количество товаров на странице

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Логика для отображения товаров на текущей странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginY: 4 }}>
        Каталог товаров
      </Typography>

      <AddProductForm />
      <Grid container spacing={3} sx={{ marginY: 4 }}>
        {currentItems.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
