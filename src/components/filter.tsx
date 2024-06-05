"use client";

import { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { lightBlue, pink } from '@mui/material/colors';
interface FilterProps {
  onFilter: (filters: { price?: string; category?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    onFilter({ price, category });
  };

  return (
    <div 
    style={{display:'flex',
     justifyContent:"center",
      alignItems:"center", 
      marginTop:'1rem', 
      marginBottom:"2rem"
      }}
      >
      <FormControl  >
        <TextField
          label="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          
        />
      </FormControl>
      <FormControl sx={{  minWidth: 150 }} >
        <InputLabel>Категории</InputLabel>
        <Select
         value={category} 
         onChange={(e) => setCategory(e.target.value)}
         
         >
          <MenuItem value="electronics">Электроника</MenuItem>
          <MenuItem value="jewelery">Ювелирные изделия</MenuItem>
          <MenuItem value="men's clothing">Мужская категория</MenuItem>
          <MenuItem value="women's clothing">Женская категория</MenuItem>
        </Select>
      </FormControl>
      {/* <Button onClick={handleFilter}></Button> */}
      <SearchRoundedIcon
      fontSize='large'
      sx={{ color: lightBlue[800], m:1 }}
       onClick={handleFilter}
       
       />
    </div>
  );
};

export default Filter;
