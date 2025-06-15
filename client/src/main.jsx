// File: client/src/main.jsx
// This file is the entry point for the React application.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'  // Import BrowserRouter for routing

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>  // Wrap App with BrowserRouter for routing support,
)
