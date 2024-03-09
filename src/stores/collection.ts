import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCollectionStore = defineStore('collection', () => {
  const collection = ref<PokemonInCollection[]>([])

  const addToCollection = (pokemon: Pokemon) => {
    const index = collection.value.findIndex((p) => p.name === pokemon.name)
    if (index === -1) {
      collection.value.push({
        ...pokemon,
        speed: pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? 0,
        quantity: 1
      })
    } else {
      collection.value[index].quantity++
    }
  }

  return {
    collection,
    addToCollection
  }
})
