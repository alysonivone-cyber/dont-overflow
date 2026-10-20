import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UiShowcase from './components/UiShowcase.tsx'

const isUiShowcase =
  new URLSearchParams(window.location.search).get('page') === 'ui-showcase'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isUiShowcase ? <UiShowcase /> : <App />}
  </StrictMode>,
)
