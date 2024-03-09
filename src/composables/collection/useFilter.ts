import { computed, type Ref } from 'vue'

// Filters a {PokemonInCollection<collection>} based on checked {Ref<filters>}
export function useFilter<T extends PokemonInCollection[], F extends Ref<Filter[]>>(
  collection: T,
  filters: F
) {
  const filteredList = computed(() => {
    return collection.filter((item) => {
      return filters.value.some((filter) => {
        return filter.checked && item.types.some(({ type }) => type.name === filter.value)
      })
    })
  })

  return {
    filteredList
  }
}
