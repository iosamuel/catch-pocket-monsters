<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  }
})

const aria = {
  title: {
    id: 'modal-window-title'
  },
  content: {
    id: 'modal-window-content'
  }
}
</script>

<template>
  <section class="modal-window">
    <dialog
      class="nes-dialog is-dark is-rounded"
      :aria-labelledby="aria.title.id"
      :aria-describedby="aria.content.id"
      :id
    >
      <form
        method="dialog"
        tabindex="-1"
      >
        <button
          class="modal-window__close"
          type="submit"
          aria-label="close"
        >
          <span aria-hidden="true">X</span>
        </button>
        <section class="modal-window__content">
          <slot :aria></slot>
        </section>
      </form>
    </dialog>
  </section>
</template>

<style scoped lang="scss">
.modal-window {
  @apply relative;

  dialog {
    @apply w-screen h-screen;
  }

  &__close {
    @apply absolute top-0 right-0;
    @apply p-4;
    @apply bg-transparent;
    @apply border-none;
    @apply cursor-pointer;
  }

  &__content {
    @apply p-4;
  }
}
</style>
