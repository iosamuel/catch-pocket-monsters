<script setup lang="ts">
import EncounterStats from '@/components/capture/EncounterStats.vue'

import { useGameStateStore } from '@/stores/gameState'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { pokemon } = storeToRefs(useGameStateStore())

const image = computed(() => {
  return pokemon.value?.sprites.front_default
})
</script>

<template>
  <div class="viewfinder nes-container is-rounded">
    <img
      :src="image"
      :alt="pokemon?.name"
    />
    <EncounterStats
      v-if="pokemon"
      :pokemon
    />
  </div>
</template>

<style scoped lang="scss">
.viewfinder {
  @apply flex flex-col items-center justify-center;
  @apply md:flex-row;
}
</style>
