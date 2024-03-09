import { describe, it, expect, vi } from 'vitest'
import { delay } from '@/utils/functions'

describe('functions', () => {
  it('delays for specified time', async () => {
    vi.useFakeTimers()

    const delayTime = 1000
    const delayPromise = delay(delayTime)

    vi.advanceTimersByTime(delayTime)

    await expect(delayPromise).resolves.toBeUndefined()
  })
})
