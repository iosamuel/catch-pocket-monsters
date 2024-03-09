<script lang="ts" setup>
import { setTrainerName, getTrainerName } from '@/utils/trainer'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const trainerName = shallowRef(getTrainerName() ?? '')

function startGame() {
  setTrainerName(trainerName.value)
  router.push('/capture')
}
</script>

<template>
  <form
    id="form-registration"
    @submit.prevent="startGame"
  >
    <input
      class="nes-input"
      placeholder="Enter your trainer name"
      required
      v-model="trainerName"
    />

    <button class="nes-btn is-primary">Start</button>
  </form>
</template>

<style scoped lang="scss">
form {
  @apply flex flex-col items-center justify-center;
}
</style>
