import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'

const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
        <StrictMode>
          <FluentProvider theme={webLightTheme}>
            <App />
          </FluentProvider>
        </StrictMode>
  </BrowserRouter>
)
