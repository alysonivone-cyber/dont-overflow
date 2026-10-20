// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import GameOutcomeScreen from './GameOutcomeScreen'

afterEach(cleanup)

const callbacks = () => ({
  onNextWorld: vi.fn(),
  onNextLevel: vi.fn(),
  onRestart: vi.fn(),
})

describe('GameOutcomeScreen — navigation', () => {
  it('shows PERFECT and proceeds to the next level', () => {
    const handlers = callbacks()
    render(<GameOutcomeScreen kind="success" world={1} level={1} result="PERFECT" isFinalLevel={false} {...handlers} />)
    expect(screen.getByRole('heading', { name: 'PERFECT!' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'NEXT LEVEL' }))
    expect(handlers.onNextLevel).toHaveBeenCalledOnce()
    expect(handlers.onNextWorld).not.toHaveBeenCalled()
  })

  it('restarts the level after GAME OVER', () => {
    const handlers = callbacks()
    render(<GameOutcomeScreen kind="failure" world={1} level={1} result="TOO LOW" isFinalLevel={false} {...handlers} />)
    expect(screen.getByRole('heading', { name: 'GAME OVER' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'TRY AGAIN' }))
    expect(handlers.onRestart).toHaveBeenCalledOnce()
  })

  it('continues to the next world after WORLD COMPLETE', () => {
    const handlers = callbacks()
    render(<GameOutcomeScreen kind="world" world={1} level={5} result="SUCCESS" isFinalLevel={false} {...handlers} />)
    fireEvent.click(screen.getByRole('button', { name: 'NEXT WORLD' }))
    expect(handlers.onNextWorld).toHaveBeenCalledOnce()
  })

  it('shows the final celebration action on the last level', () => {
    const handlers = callbacks()
    render(<GameOutcomeScreen kind="success" world={15} level={5} result="SUCCESS" isFinalLevel {...handlers} />)
    fireEvent.click(screen.getByRole('button', { name: /FINAL CELEBRATION!/ }))
    expect(handlers.onNextLevel).toHaveBeenCalledOnce()
  })
})
