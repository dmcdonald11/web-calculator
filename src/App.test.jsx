import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

const click = async (...names) => {
  for (const n of names) await userEvent.click(screen.getByRole('button', { name: n }))
}
const display = () => screen.getByTestId('display').textContent

describe('App', () => {
  it('starts at 0', () => {
    render(<App />)
    expect(display()).toBe('0')
  })
  it('computes 2 + 3 * 4 = 20', async () => {
    render(<App />)
    await click('2', 'add', '3', 'multiply', '4', 'equals')
    expect(display()).toBe('20')
  })
  it('shows Error on divide by zero and recovers with C', async () => {
    render(<App />)
    await click('1', 'divide', '0', 'equals')
    expect(display()).toBe('Error')
    await click('clear')
    expect(display()).toBe('0')
  })
  it('supports keyboard input', async () => {
    render(<App />)
    await userEvent.keyboard('0.1+0.2')
    await userEvent.keyboard('[Enter]')
    expect(display()).toBe('0.3')
  })
})
