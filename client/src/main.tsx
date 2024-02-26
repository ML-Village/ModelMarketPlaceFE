import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider as JotaiProvider } from 'jotai';
import Web3Store from '@/stores/web3Store/Web3Store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <App />
      <Web3Store />
    </JotaiProvider>
  </React.StrictMode>,
)
