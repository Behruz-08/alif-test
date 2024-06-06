'use client'

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
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct = {
      id: Date.now(), 
      title,
      price: parseFloat(price),
      category,
      description, 
      image
    };

    dispatch(addProduct(newProduct));

    
    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
  };

  return (
    <div style={{
      // display:"flex",
      width:"30rem"
    }}>

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
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
        <TextField
        label="URL изображения"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить товар
      </Button>
    </Box>
    </div>
  );
};

export default AddProductForm;
