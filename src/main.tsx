import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h2 id='pageTitle'>Cotizador online AT&T Negocios</h2>
    <App />
  </React.StrictMode>,
)
