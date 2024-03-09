import { computed, type Ref } from 'vue'

// Sorts a {Ref<collection>} of items by a given key.
// @returns the computed {sortedList}.
export function useSort<T extends Ref<any[]>>(collection: T, sortBy: Ref<string>) {
  const sortedList = computed<T['value']>(() => {
    return collection.value.sort((a, b) => {
      if (typeof a[sortBy.value] === 'string') {
        return a[sortBy.value].localeCompare(b[sortBy.value])
      }
      return a[sortBy.value] > b[sortBy.value] ? 1 : -1
    })
  })

  return {
    sortedList
  }
}
