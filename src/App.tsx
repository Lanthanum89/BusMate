import { useEffect, useState } from 'react'
import { ROUTE_COLOR_HEX, stops, stopUrl, type StopGroup } from './data/stops'

type Theme = 'light' | 'dark'

const GROUPS: StopGroup[] = ['home', 'town']
const GROUP_LABELS: Record<StopGroup, string> = { home: 'Home', town: 'Town' }

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stop-arrow">
      <path d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [group, setGroup] = useState<StopGroup>('home')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const visibleStops = stops.filter((stop) => stop.group === group)

  return (
    <div className="app">
      <header className="app-header">
        <h1>BusMate</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle dark mode"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </header>

      <div className="group-toggle" role="group" aria-label="Stop group">
        {GROUPS.map((g) => (
          <button
            key={g}
            className={`group-button ${group === g ? 'active' : ''}`}
            onClick={() => setGroup(g)}
          >
            {GROUP_LABELS[g]}
          </button>
        ))}
      </div>

      <ul className="stop-list">
        {visibleStops.map((stop) => (
          <li key={stop.id}>
            <a className="stop-card" href={stopUrl(stop.code)} target="_blank" rel="noreferrer">
              <span className="stop-name">
                <span
                  className="stop-swatch"
                  style={{ backgroundColor: ROUTE_COLOR_HEX[stop.color] }}
                  title={`${stop.color} route`}
                />
                <span className="stop-label">{stop.label}</span>
              </span>
              <span className="stop-meta">
                <span className="stop-code">{stop.code}</span>
                <ExternalLinkIcon />
              </span>
            </a>
          </li>
        ))}
        {visibleStops.length === 0 && (
          <li className="stop-empty">No {GROUP_LABELS[group].toLowerCase()} stops yet.</li>
        )}
      </ul>

      <p className="privacy-note">No accounts, no tracking. Taps open reading-buses.co.uk directly.</p>
    </div>
  )
}

export default App
