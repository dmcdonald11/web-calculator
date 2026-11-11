import { useEffect, useReducer } from 'react'
import { handleKey, initialState } from './calc.js'

const KEYS = [
  { k: 'C', cls: 'fn' }, { k: '+/-', cls: 'fn' }, { k: '%', cls: 'fn' }, { k: '/', label: '÷', cls: 'op' },
  { k: '7' }, { k: '8' }, { k: '9' }, { k: '*', label: '×', cls: 'op' },
  { k: '4' }, { k: '5' }, { k: '6' }, { k: '-', label: '−', cls: 'op' },
  { k: '1' }, { k: '2' }, { k: '3' }, { k: '+', cls: 'op' },
  { k: '0', cls: 'zero' }, { k: '.' }, { k: '=', cls: 'op' },
]

const NAMES = { '/': 'divide', '*': 'multiply', '-': 'subtract', '+': 'add', '=': 'equals', C: 'clear', '+/-': 'sign', '%': 'percent', '.': 'decimal' }

export default function App() {
  const [state, press] = useReducer(handleKey, initialState)

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      let key = e.key
      if (key === 'Enter') key = '='
      else if (key === 'Escape' || key === 'c') key = 'C'
      if (/^[0-9.+\-*/=%C]$/.test(key)) press(key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="calculator">
      <div className="display" data-testid="display" aria-live="polite">{state.display}</div>
      <div className="keys">
        {KEYS.map(({ k, label, cls }) => (
          <button key={k} className={cls} aria-label={NAMES[k] ?? k} onClick={() => press(k)}>
            {label ?? k}
          </button>
        ))}
      </div>
    </div>
  )
}
