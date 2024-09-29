'use client';

import StickyHeader from '@/components/sticky-header';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import React from 'react';
import { Provider } from 'react-redux';

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html id="__next" lang="en">
      <body className="min-h-screen">
        <StickyHeader />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};
export default RootLayout;
