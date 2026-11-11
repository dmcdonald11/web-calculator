// Pure calculator logic. No React imports.

export const initialState = {
  display: '0',
  acc: null, // accumulated left operand
  op: null, // pending operator
  fresh: true, // next digit starts a new entry
  error: false,
}

const MAX_DIGITS = 12

export function round(n) {
  return Number(parseFloat(n.toPrecision(12)))
}

export function format(n) {
  return String(round(n))
}

export function compute(a, op, b) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0 ? NaN : a / b
    default: return b
  }
}

const errorState = { ...initialState, display: 'Error', error: true }

function applyPending(state) {
  const cur = parseFloat(state.display)
  if (state.op === null) return cur
  return compute(state.acc, state.op, cur)
}

export function inputDigit(state, d) {
  if (state.error) return state
  if (state.fresh) return { ...state, display: d, fresh: false }
  if (state.display.replace(/[-.]/g, '').length >= MAX_DIGITS) return state
  return { ...state, display: state.display === '0' ? d : state.display + d }
}

export function inputDecimal(state) {
  if (state.error) return state
  if (state.fresh) return { ...state, display: '0.', fresh: false }
  if (state.display.includes('.')) return state
  return { ...state, display: state.display + '.' }
}

export function inputOperator(state, op) {
  if (state.error) return state
  if (state.op !== null && state.fresh) return { ...state, op }
  const result = applyPending(state)
  if (!Number.isFinite(result)) return errorState
  return { ...state, acc: round(result), op, display: format(result), fresh: true }
}

export function equals(state) {
  if (state.error || state.op === null) return state
  const result = applyPending(state)
  if (!Number.isFinite(result)) return errorState
  return { ...initialState, display: format(result), fresh: true }
}

export function toggleSign(state) {
  if (state.error) return state
  const n = parseFloat(state.display)
  if (n === 0 && !state.display.includes('.')) return state
  const display = state.display.startsWith('-') ? state.display.slice(1) : '-' + state.display
  return { ...state, display }
}

export function percent(state) {
  if (state.error) return state
  const n = parseFloat(state.display) / 100
  return { ...state, display: format(n), fresh: true }
}

export function clear() {
  return initialState
}

// Single entry point: key is a digit, '.', '+', '-', '*', '/', '=', 'C', '+/-', '%'
export function handleKey(state, key) {
  if (/^[0-9]$/.test(key)) return inputDigit(state, key)
  switch (key) {
    case '.': return inputDecimal(state)
    case '+': case '-': case '*': case '/': return inputOperator(state, key)
    case '=': return equals(state)
    case 'C': return clear()
    case '+/-': return toggleSign(state)
    case '%': return percent(state)
    default: return state
  }
}
