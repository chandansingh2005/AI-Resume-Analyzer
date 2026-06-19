
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "react-hot-toast";

<AuthProvider>
  <App />
  <Toaster position="top-right" />
</AuthProvider>

createRoot(document.getElementById('root')!).render(
  <AuthProvider>

    <App />
    <Toaster position="top-right" />
  </AuthProvider>

)
