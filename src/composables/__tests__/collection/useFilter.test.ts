import { describe, it, expect } from 'vitest'
import { ref, reactive } from 'vue'
import { useFilter } from '@/composables/collection/useFilter'

describe('useFilter', () => {
  it('filters a collection based on checked filters', () => {
    const collection = reactive([
      { name: 'Pikachu', types: [{ type: { name: 'Electric' } }] },
      { name: 'Bulbasaur', types: [{ type: { name: 'Grass' } }, { type: { name: 'Poison' } }] },
      { name: 'Charmander', types: [{ type: { name: 'Fire' } }] }
    ]) as PokemonInCollection[]

    const filters = ref([
      { label: 'Electric', value: 'Electric', checked: true },
      { label: 'Fire', value: 'Fire', checked: false },
      { label: 'Grass', value: 'Grass', checked: true }
    ])

    const { filteredList } = useFilter(collection, filters)

    expect(filteredList.value).toEqual([
      { name: 'Pikachu', types: [{ type: { name: 'Electric' } }] },
      { name: 'Bulbasaur', types: [{ type: { name: 'Grass' } }, { type: { name: 'Poison' } }] }
    ])

    // Reactivity
    filters.value[0].checked = false
    expect(filteredList.value).toEqual([
      { name: 'Bulbasaur', types: [{ type: { name: 'Grass' } }, { type: { name: 'Poison' } }] }
    ])
  })
})
