import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ViewProvider } from './context/ViewContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ViewProvider>
    <App />
    </ViewProvider>
    </BrowserRouter>
  </StrictMode>,
)
