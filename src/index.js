import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);