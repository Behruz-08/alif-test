

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts, Product } from "../slices/ProductsSlice";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";
import { Container, Grid, Pagination, Box, Typography, CircularProgress } from "@mui/material";
import Filter from "@/components/filter";
import { light } from "@mui/material/styles/createPalette";
import { lightBlue } from "@mui/material/colors";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(items);
  }, [items,status]);

  const handleFilter = (filters: { price?: string; category?: string; description?: string }) => {
    const { price, category, description } = filters;
    let filtered = items;
    if (price) {
      filtered = filtered.filter((product) => product.price <= Number(price));
    }
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (description) {
      filtered = filtered.filter((product) =>
        product.description.toLowerCase().includes(description.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); 
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (status === "loading") {
    return <CircularProgress />;
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <Typography variant="h3" sx={{ marginY: 4, marginX: 6, color:lightBlue[300] }}>
        Каталог товаров
      </Typography>
      <div style={{
        display:"flex",
  
       justifyContent:"space-between",
        // alignItems:"center",

        }}>

      <Filter onFilter={handleFilter} />
      <AddProductForm />
      </div>
      <Grid container spacing={3} sx={{ marginY: 4 }}>
        {currentItems.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
