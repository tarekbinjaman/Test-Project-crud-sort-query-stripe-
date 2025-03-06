import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <div className='max-w-screen-xl mx-auto'>
    <RouterProvider router={router} />
      </div>
      <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
