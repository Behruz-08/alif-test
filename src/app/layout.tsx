"use client";

import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/header/page';
import '../app/globals.css';

const theme = createTheme();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
