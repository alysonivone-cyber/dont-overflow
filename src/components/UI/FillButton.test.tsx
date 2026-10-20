// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { FillButton } from './FillButton'

afterEach(cleanup)

const defaults = {
  isWaiting: true,
  isFilling: false,
  isInertiaActive: false,
  isEvaporating: false,
}

describe('FillButton — player interactions', () => {
  it('starts filling when the player clicks START FILLING', () => {
    const onToggleFilling = vi.fn()
    render(<FillButton {...defaults} onToggleFilling={onToggleFilling} onRetry={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'START FILLING' }))
    expect(onToggleFilling).toHaveBeenCalledOnce()
  })

  it('stops filling when the player clicks STOP FILLING', () => {
    const onToggleFilling = vi.fn()
    render(<FillButton {...defaults} isFilling onToggleFilling={onToggleFilling} onRetry={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'STOP FILLING' }))
    expect(onToggleFilling).toHaveBeenCalledOnce()
  })

  it('disables the action during inertia', () => {
    const onToggleFilling = vi.fn()
    render(<FillButton {...defaults} isInertiaActive onToggleFilling={onToggleFilling} onRetry={vi.fn()} />)
    const button = screen.getByRole('button', { name: 'WATER STILL FLOWING...' }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    fireEvent.click(button)
    expect(onToggleFilling).not.toHaveBeenCalled()
  })

  it('disables the action during evaporation', () => {
    render(<FillButton {...defaults} isEvaporating onToggleFilling={vi.fn()} onRetry={vi.fn()} />)
    expect((screen.getByRole('button', { name: 'EVAPORATING...' }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('retries after an attempt is evaluated', () => {
    const onRetry = vi.fn()
    const onToggleFilling = vi.fn()
    render(<FillButton {...defaults} isWaiting={false} onToggleFilling={onToggleFilling} onRetry={onRetry} />)
    fireEvent.click(screen.getByRole('button', { name: 'TRY AGAIN' }))
    expect(onRetry).toHaveBeenCalledOnce()
    expect(onToggleFilling).not.toHaveBeenCalled()
  })
})
