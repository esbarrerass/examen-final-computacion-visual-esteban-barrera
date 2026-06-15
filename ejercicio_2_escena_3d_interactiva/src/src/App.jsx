import { useState, useEffect } from 'react'
import { Scene } from './components/Scene'
import './index.css'

function App() {
  const [paused, setPaused] = useState(false)
  const [lightMode, setLightMode] = useState('night')

  // Interacción por teclado
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setPaused(p => !p)
      }
      if (e.code === 'KeyL') setLightMode(m => m === 'day' ? 'night' : 'day')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene paused={paused} lightMode={lightMode} />

      {/* Panel de información */}
      <div id="ui-overlay">
        <h2>FÁBRICA AUTOMATIZADA</h2>
        <div><span className="key">ESPACIO</span> — Pausar / Reanudar</div>
        <div><span className="key">L</span> — Cambiar iluminación</div>
        <div><span className="key">DRAG</span> — Rotar cámara</div>
        <div><span className="key">SCROLL</span> — Zoom</div>
        <div><span className="key">CLIC DER</span> — Desplazar</div>
      </div>

      {/* Barra de estado */}
      <div id="status-bar">
        <div>ESTADO: {paused ? '⏸ PAUSA' : '▶ ACTIVO'}</div>
        <div>LUZ: {lightMode === 'day' ? '☀ DÍA' : '🌙 NOCHE'}</div>
        <div>ROBOTS AGV: 2</div>
        <div>BRAZOS: 3</div>
        <div>CINTAS: 2</div>
      </div>

      {/* Botones de control */}
      <div id="ui-controls">
        <button
          className={!paused ? 'active' : ''}
          onClick={() => setPaused(p => !p)}
        >
          {paused ? '▶ REANUDAR' : '⏸ PAUSAR'}
        </button>
        <button
          className={lightMode === 'day' ? 'active' : ''}
          onClick={() => setLightMode(m => m === 'day' ? 'night' : 'day')}
        >
          {lightMode === 'day' ? '☀ DÍA' : '🌙 NOCHE'}
        </button>
      </div>
    </div>
  )
}

export default App
