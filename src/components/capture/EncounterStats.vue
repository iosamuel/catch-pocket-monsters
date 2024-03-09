<script setup lang="ts">
defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <div class="encounter-stats">
    <div
      class="nes-container with-title"
      tabindex="0"
    >
      <h3 class="title">Stats</h3>
      <ul class="stats nes-list is-disc">
        <li class="encounter-stats__stat">
          <span>name: </span>
          <span>{{ pokemon.name }}</span>
        </li>
        <li class="encounter-stats__stat">
          <span>height: </span>
          <span>{{ pokemon.height }}</span>
        </li>
        <li class="encounter-stats__stat encounter-stats__stat--type">
          <span>type:</span>
          <span
            v-for="{ type: { name } } in pokemon.types"
            :key="name"
          >
            {{ name }}
          </span>
        </li>
        <li
          class="encounter-stats__stat"
          v-for="{ stat: { name }, base_stat } in pokemon.stats"
          :key="name"
        >
          <span>{{ name }}: </span>
          <span>{{ base_stat }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.encounter-stats {
  &__stat {
    @apply flex justify-between;
  }
}
</style>
