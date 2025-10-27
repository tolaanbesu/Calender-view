import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import Tailwind directives and global styles
import './styles/globals.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
