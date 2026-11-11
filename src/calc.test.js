import { describe, it, expect } from 'vitest'
import { handleKey, initialState } from './calc.js'

const run = (keys) => keys.split(' ').filter(Boolean).reduce(handleKey, initialState).display

describe('calc', () => {
  it('digits', () => expect(run('1 2 3')).toBe('123'))
  it('add', () => expect(run('2 + 3 =')).toBe('5'))
  it('subtract', () => expect(run('9 - 4 =')).toBe('5'))
  it('multiply', () => expect(run('6 * 7 =')).toBe('42'))
  it('divide', () => expect(run('8 / 4 =')).toBe('2'))
  it('decimals', () => expect(run('1 . 5 + 2 . 2 5 =')).toBe('3.75'))
  it('ignores second decimal point', () => expect(run('1 . 2 . 3')).toBe('1.23'))
  it('leading decimal', () => expect(run('. 5')).toBe('0.5'))
  it('sign toggle', () => {
    expect(run('5 +/-')).toBe('-5')
    expect(run('5 +/- +/-')).toBe('5')
    expect(run('0 +/-')).toBe('0')
    expect(run('5 +/- + 2 =')).toBe('-3')
  })
  it('percent', () => {
    expect(run('5 0 %')).toBe('0.5')
    expect(run('5 %')).toBe('0.05')
  })
  it('chains left to right', () => {
    expect(run('2 + 3 * 4 =')).toBe('20')
    expect(run('2 + 3 *')).toBe('5')
  })
  it('replaces pending operator', () => expect(run('2 + * 3 =')).toBe('6'))
  it('C clears', () => expect(run('2 + 3 C')).toBe('0'))
  it('divide by zero errors and recovers on C', () => {
    expect(run('5 / 0 =')).toBe('Error')
    expect(run('5 / 0 = 7')).toBe('Error')
    expect(run('5 / 0 = C 7')).toBe('7')
  })
  it('rounds float noise', () => {
    expect(run('0 . 1 + 0 . 2 =')).toBe('0.3')
    expect(run('0 . 3 - 0 . 1 =')).toBe('0.2')
  })
  it('continues from result', () => expect(run('2 + 3 = * 4 =')).toBe('20'))
})
