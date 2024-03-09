import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStateStore } from '@/stores/gameState'
import { getPokemon } from '@/api/pokemon'

vi.mock('@/api/pokemon', () => ({
  getPokemon: vi.fn()
}))

describe('gameState', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches a random pokemon', async () => {
    const randomPokemon = { name: 'Pikachu', id: 25 }
    // @ts-ignore - getPokemon is mocked
    getPokemon.mockResolvedValue(randomPokemon)

    const store = useGameStateStore()
    const pokemon = await store.fetchRandomPokemon()

    expect(pokemon).toEqual(randomPokemon)
    expect(store.pokemon).toEqual(randomPokemon)
  })

  it('sets a pokemon', () => {
    const store = useGameStateStore()
    const pokemon = { name: 'Pikachu', id: 25 }
    store.setPokemon(pokemon as Pokemon)

    expect(store.pokemon).toEqual(pokemon)
  })

  it('adds an event to the event log', () => {
    const store = useGameStateStore()
    store.addEvent('Test event')

    expect(store.eventLog).toHaveLength(1)
    expect(store.eventLog[0].event).toBe('Test event')
  })

  it('clears the event log', () => {
    const store = useGameStateStore()
    store.addEvent('Test event')
    store.clearEvents()

    expect(store.eventLog).toHaveLength(0)
  })
})
