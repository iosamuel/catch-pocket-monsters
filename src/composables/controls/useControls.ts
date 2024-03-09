import { useCollectionStore } from '@/stores/collection'
import { useGameStateStore } from '@/stores/gameState'
import { getTrainerName } from '@/utils/trainer'
import { delay } from '@/utils/functions'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

export function useControls() {
  const { pokemon } = storeToRefs(useGameStateStore())
  const { setPokemon, fetchRandomPokemon, addEvent } = useGameStateStore()
  const { addToCollection } = useCollectionStore()

  const trainerName = getTrainerName()

  async function findPokemon() {
    const pokemon = await fetchRandomPokemon()
    addEvent(`You found a wild ${pokemon.name}!`)
  }

  function removePokemon() {
    setPokemon(undefined)
  }

  const THROW_SUCCESS_RATE = 0.33
  const THROW_DELAY_MS = 300
  const MAX_THROW_TRIES = 2

  const throwing = ref(false)
  let throwTries = 0

  async function throwBall() {
    throwTries++
    throwing.value = true
    addEvent(`${trainerName} throws a ball at ${pokemon.value!.name}`)

    await delay(THROW_DELAY_MS)

    const success = Math.random() > THROW_SUCCESS_RATE
    if (success) {
      handleSuccess()
    } else {
      handleFailure()
    }
  }

  function handleSuccess() {
    addEvent(`${pokemon.value!.name} was caught!`)
    throwTries = 0
    throwing.value = false
    addToCollection(pokemon.value!)
    removePokemon()
  }

  async function handleFailure() {
    addEvent(`${pokemon.value!.name} was not caught!`)
    if (throwTries >= MAX_THROW_TRIES) {
      await delay(THROW_DELAY_MS)
      addEvent(`${pokemon.value!.name} ran away!`)
      throwTries = 0
      throwing.value = false
      removePokemon()
    }
  }

  return {
    findPokemon,
    removePokemon,
    throwBall,
    throwing
  }
}
