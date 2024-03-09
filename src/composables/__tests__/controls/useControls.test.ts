import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useControls } from '@/composables/controls/useControls'
import { useCollectionStore } from '@/stores/collection'
import { useGameStateStore } from '@/stores/gameState'
import { getTrainerName } from '@/utils/trainer'

vi.mock('@/utils/trainer', () => ({ getTrainerName: () => 'Red' }))
vi.mock('@/utils/functions')

const mockPokemon = { name: 'Pikachu', id: 25 }

describe('useControls', () => {
  beforeAll(() => {
    createTestingPinia({
      createSpy: vi.fn
    })
  })

  it('finds a pokemon', async () => {
    // @ts-ignore - mocked pinia store
    useGameStateStore().fetchRandomPokemon.mockResolvedValue(mockPokemon)

    const { findPokemon } = useControls()
    await findPokemon()

    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(
      `You found a wild ${mockPokemon.name}!`
    )
  })

  it('removes a pokemon', () => {
    const { removePokemon } = useControls()
    removePokemon()

    expect(useGameStateStore().setPokemon).toHaveBeenCalledWith(undefined)
  })

  it('throws a ball / success', async () => {
    // Above 0.33 for success
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    useGameStateStore().pokemon = mockPokemon as Pokemon

    const { findPokemon, throwBall } = useControls()
    await findPokemon()
    await throwBall()

    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(
      `${getTrainerName()} throws a ball at ${mockPokemon.name}`
    )
    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(`${mockPokemon.name} was caught!`)
    expect(useCollectionStore().addToCollection).toHaveBeenCalledWith(mockPokemon)
    expect(useGameStateStore().setPokemon).toHaveBeenCalledWith(undefined)
  })

  it('throws a ball / failure', async () => {
    // Below 0.33 for failure
    vi.spyOn(Math, 'random').mockReturnValue(0.2)

    useGameStateStore().pokemon = mockPokemon as Pokemon

    const { findPokemon, throwBall } = useControls()
    await findPokemon()
    await throwBall()

    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(
      `${getTrainerName()} throws a ball at ${mockPokemon.name}`
    )
    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(`${mockPokemon.name} was not caught!`)

    // Second throw (failure)
    await throwBall()

    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(
      `${getTrainerName()} throws a ball at ${mockPokemon.name}`
    )
    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(`${mockPokemon.name} was not caught!`)

    // Throw limit reached (2)
    expect(useGameStateStore().addEvent).toHaveBeenCalledWith(`${mockPokemon.name} ran away!`)
    expect(useGameStateStore().setPokemon).toHaveBeenCalledWith(undefined)
  })
})
