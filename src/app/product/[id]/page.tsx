"use client";



import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Container, Typography, CircularProgress } from '@mui/material';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { items, status } = useSelector((state: RootState) => state.products);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="h5">${product.price}</Typography>
      <Typography variant="h6">{product.category}</Typography>
      <Typography>{product.description}</Typography>
    </Container>
  );
}
