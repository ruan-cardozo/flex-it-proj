import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FluentProvider } from '@fluentui/react-components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider>  <App /> </FluentProvider>
  </StrictMode>,
)
