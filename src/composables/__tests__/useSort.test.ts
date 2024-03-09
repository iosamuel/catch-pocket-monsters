import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useSort } from '@/composables/useSort'

describe('useSort', () => {
  it('sorts a collection by the given key (string)', () => {
    const collection = ref([{ name: 'b' }, { name: 'a' }, { name: 'c' }])
    const sortBy = ref('name')

    const { sortedList } = useSort(collection, sortBy)

    expect(sortedList.value).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }])
  })

  it('sorts a collection by the given key (number)', () => {
    const collection = ref([{ id: 2 }, { id: 1 }, { id: 3 }])
    const sortBy = ref('id')

    const { sortedList } = useSort(collection, sortBy)

    expect(sortedList.value).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('sorts a collection by the given key reacting to changes', () => {
    const collection = ref([
      { name: 'c', id: 4 },
      { name: 'b', id: 5 },
      { name: 'd', id: 3 }
    ])
    const sortBy = ref('name')

    const { sortedList } = useSort(collection, sortBy)

    expect(sortedList.value).toEqual([
      { name: 'b', id: 5 },
      { name: 'c', id: 4 },
      { name: 'd', id: 3 }
    ])

    collection.value.push({ name: 'a', id: 6 })

    expect(sortedList.value).toEqual([
      { name: 'a', id: 6 },
      { name: 'b', id: 5 },
      { name: 'c', id: 4 },
      { name: 'd', id: 3 }
    ])

    sortBy.value = 'id'

    expect(sortedList.value).toEqual([
      { name: 'd', id: 3 },
      { name: 'c', id: 4 },
      { name: 'b', id: 5 },
      { name: 'a', id: 6 }
    ])
  })
})
