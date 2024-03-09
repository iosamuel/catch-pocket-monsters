import { describe, it, expect } from 'vitest'
import { getTrainerName, setTrainerName } from '@/utils/trainer'

describe('trainer', () => {
  it('gets and sets trainer name', () => {
    const trainerName = 'Ash Ketchum'

    setTrainerName(trainerName)

    expect(getTrainerName()).toBe(trainerName)
  })
})
