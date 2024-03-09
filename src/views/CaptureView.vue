<script setup lang="ts">
import CollectionModal from '@/components/modals/CollectionModal.vue'
import EventLog from '@/components/capture/EventLog.vue'
import GameControls from '@/components/capture/GameControls.vue'
import ViewFinder from '@/components/capture/ViewFinder.vue'
</script>

<template>
  <div class="capture-view">
    <EventLog />
    <ViewFinder />
    <GameControls collectionModalId="collection-modal" />

    <CollectionModal />
  </div>
</template>

<style scoped lang="scss">
.capture-view {
  @apply w-full h-full grid grid-cols-1;
  grid-template-rows: 100px 1fr 200px;
}
</style>
