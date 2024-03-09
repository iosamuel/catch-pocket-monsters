import { ref, watch, type Ref } from 'vue'

// Based on the given {Ref<types>}, creates a list of filters.
// Watches for changes in the given {Ref<types>} and updates the {Ref<filters>} list.
// @returns the {Ref<filters>} list.
export function useFilters<T extends Ref<any[]>>(types: T) {
  const filters = ref<Filter[]>(
    types.value.map((type) => ({ label: type, value: type, checked: true }))
  )

  watch(
    types,
    (newTypes) => {
      filters.value = newTypes.map((type, index) => ({
        label: type,
        value: type,
        checked: filters.value[index]?.checked ?? true
      }))
    },
    { deep: true }
  )

  return {
    filters
  }
}
