import { useState, useEffect } from 'react'
import Board from './components/Board'
import './index.css'

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="app">
      <header className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>📝 Kanban Planner</h2>

        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--accent-color)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'inherit',
            transition: 'background 0.3s'
          }}
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main style={{ flex: 1, display: 'flex' }}>
        <Board />
      </main>
    </div>
  )
}

export default App
