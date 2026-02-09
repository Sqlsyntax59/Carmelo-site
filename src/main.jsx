import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const AdminPanel = lazy(() => import('./components/admin/AdminPanel.jsx'))

const isAdmin = window.location.pathname === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#06060a', color: 'rgba(255,255,255,0.35)',
          fontFamily: "'Inter', sans-serif", fontSize: 13,
        }}>
          Chargement...
        </div>
      }>
        <AdminPanel />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
