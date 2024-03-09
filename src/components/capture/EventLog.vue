<script setup lang="ts">
import { useGameStateStore } from '@/stores/gameState'

const { eventLog } = useGameStateStore()
</script>

<template>
  <div class="event-log">
    <transition-group
      name="list"
      tag="ul"
      class="relative"
    >
      <li
        role="alert"
        v-for="{ id, event } in eventLog"
        :key="id + event"
      >
        {{ event }}
      </li>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.event-log {
  @apply pt-8 px-4 overflow-hidden;
}

.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0 scale-y-50 translate-x-10;
}

.list-leave-active {
  @apply absolute;
}
</style>
