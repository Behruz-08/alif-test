// src/components/AddProductForm.tsx
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addProduct } from "../slices/ProductsSlice";
import { TextField, Button, Box } from "@mui/material";

const AddProductForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct = {
      id: Date.now(), // генерируем уникальный id
      title,
      price: parseFloat(price),
      category,
    };

    dispatch(addProduct(newProduct));

    // Очищаем поля формы
    setTitle("");
    setPrice("");
    setCategory("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Цена"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <TextField
        label="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить товар
      </Button>
    </Box>
  );
};

export default AddProductForm;
