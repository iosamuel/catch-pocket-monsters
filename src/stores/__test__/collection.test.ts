import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCollectionStore } from '@/stores/collection'

describe('collection', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a new pokemon to the collection', () => {
    const store = useCollectionStore()
    const pokemon = {
      name: 'Pikachu',
      stats: [{ stat: { name: 'speed' }, base_stat: 90 }]
    }

    store.addToCollection(pokemon as Pokemon)

    expect(store.collection).toHaveLength(1)
    expect(store.collection[0].name).toBe('Pikachu')
    expect(store.collection[0].speed).toBe(90)
    expect(store.collection[0].quantity).toBe(1)
  })

  it('increments quantity when adding an existing pokemon to the collection', () => {
    const store = useCollectionStore()
    const pokemon = { name: 'Pikachu', stats: [{ stat: { name: 'speed' }, base_stat: 90 }] }

    store.addToCollection(pokemon as Pokemon)
    store.addToCollection(pokemon as Pokemon)

    expect(store.collection).toHaveLength(1)
    expect(store.collection[0].quantity).toBe(2)
  })
})
