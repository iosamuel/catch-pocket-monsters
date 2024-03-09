import { getPokemon } from '@/api/pokemon'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const POKEMON_LENGTH = 151

export const useGameStateStore = defineStore('gameState', () => {
  const pokemon = ref<Pokemon>()
  const eventLog = ref<{ id: number; event: string }[]>([])

  async function fetchRandomPokemon() {
    const pokemon = await getPokemon(Math.floor(Math.random() * POKEMON_LENGTH) + 1)
    setPokemon(pokemon)
    return pokemon
  }

  function setPokemon(p: Pokemon | undefined) {
    pokemon.value = p
  }

  function addEvent(event: string) {
    eventLog.value.unshift({ id: Date.now(), event })
  }

  function clearEvents() {
    eventLog.value = []
  }

  return {
    pokemon,
    eventLog,

    fetchRandomPokemon,
    setPokemon,

    addEvent,
    clearEvents
  }
})
