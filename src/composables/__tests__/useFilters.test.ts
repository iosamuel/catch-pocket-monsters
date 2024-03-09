import { describe, it, expect } from 'vitest'
import { nextTick, ref } from 'vue'
import { useFilters } from '@/composables/useFilters'

describe('useFilters', () => {
  it('creates a list of filters based on the given types', () => {
    const types = ref(['a', 'b', 'c'])
    const { filters } = useFilters(types)

    expect(filters.value).toEqual([
      { label: 'a', value: 'a', checked: true },
      { label: 'b', value: 'b', checked: true },
      { label: 'c', value: 'c', checked: true }
    ])
  })

  it('updates the filters list when the given types change', async () => {
    const types = ref(['a', 'b', 'c'])
    const { filters } = useFilters(types)

    types.value.push('d')

    await nextTick()

    expect(filters.value).toEqual([
      { label: 'a', value: 'a', checked: true },
      { label: 'b', value: 'b', checked: true },
      { label: 'c', value: 'c', checked: true },
      { label: 'd', value: 'd', checked: true }
    ])
  })
})
