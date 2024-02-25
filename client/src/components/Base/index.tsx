import React from 'react';
import { MarketNavbar } from '../Navbar';

export const BasePageTemplate = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <MarketNavbar />
      {children}
    </div>)
};
