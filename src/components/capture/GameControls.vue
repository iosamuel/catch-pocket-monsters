<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AlertDialog from '@/components/ui/AlertDialog.vue'

import { useGameStateStore } from '@/stores/gameState'
import { useCollectionStore } from '@/stores/collection'

import { useControls } from '@/composables/controls/useControls'
import { useModal } from '@/composables/modals/useModal'

const props = defineProps<{
  collectionModalId: string
}>()
const emit = defineEmits(['openCollection'])

const { pokemon } = storeToRefs(useGameStateStore())
const { clearEvents } = useGameStateStore()

const hasPokemon = computed(() => Boolean(pokemon.value))

const { findPokemon, removePokemon, throwBall, throwing } = useControls()

const findDisabled = computed(() => ({
  class: hasPokemon.value ? 'is-disabled' : '',
  disabled: hasPokemon.value
}))

const ignoreDisabled = computed(() => ({
  class: !hasPokemon.value || throwing.value ? 'is-disabled' : '',
  disabled: !hasPokemon.value || throwing.value
}))

const throwDisabled = computed(() => ({
  class: !hasPokemon.value ? 'is-disabled' : '',
  disabled: !hasPokemon.value
}))

const { collection } = useCollectionStore()

const { openModal } = useModal(props.collectionModalId)

function showCollectionView() {
  openModal()
}

const router = useRouter()

function quitGame() {
  removePokemon()
  clearEvents()
  router.push('/')
}
</script>

<template>
  <form class="controls">
    <fieldset class="controls__container nes-container with-title">
      <legend class="title">Controls</legend>

      <div class="controls__top">
        <button
          class="nes-btn is-primary"
          @click.prevent="findPokemon"
          v-bind="findDisabled"
        >
          Find
        </button>
        <button
          class="nes-btn is-warning"
          @click.prevent="removePokemon"
          v-bind="ignoreDisabled"
        >
          Ignore
        </button>
        <button
          class="nes-btn is-success"
          @click.prevent="throwBall"
          v-bind="throwDisabled"
        >
          Throw
        </button>
      </div>

      <div class="controls__bottom">
        <button
          class="nes-btn"
          @click.prevent="showCollectionView"
        >
          Pokedex({{ collection.length }})
        </button>

        <AlertDialog
          title="Quit Game"
          content="Are you sure you want to quit?"
          confirm="Yes"
          cancel="No"
          v-slot="{ clickFn }"
          @closeConfirm="quitGame"
        >
          <button
            class="nes-btn is-error"
            @click.prevent="clickFn"
          >
            Quit
          </button>
        </AlertDialog>
      </div>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
.controls {
  @apply flex items-center justify-center mt-4;

  &__container {
    @apply flex flex-col items-center justify-between;

    legend.title {
      @apply w-auto m-0;
    }
  }

  &__top {
    @apply flex items-center justify-between;
    @apply w-full;
  }

  &__bottom {
    @apply flex items-center justify-between;
    @apply w-full mt-4;
  }
}
</style>
