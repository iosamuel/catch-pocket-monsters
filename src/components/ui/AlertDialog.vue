<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Dialog'
  },
  content: {
    type: String,
    default: 'Alert: this is a dialog.'
  },
  cancel: {
    type: String,
    default: 'Cancel'
  },
  confirm: {
    type: String,
    default: 'Confirm'
  }
})

const emit = defineEmits(['closeConfirm'])

const dialog = ref<HTMLDialogElement | null>(null)

function openDialog() {
  if (dialog.value === null) return

  dialog.value.returnValue = ''
  dialog.value.showModal()
}

onMounted(() => {
  dialog.value?.addEventListener('close', (event) => {
    if ((event.target as HTMLDialogElement).returnValue === 'confirm') {
      emit('closeConfirm')
    }
  })
})
</script>

<template>
  <section class="alert-dialog">
    <slot :clickFn="openDialog">
      <button
        type="button"
        class="nes-btn is-primary"
        @click="openDialog"
      ></button>
    </slot>

    <dialog
      class="nes-dialog"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-content"
      ref="dialog"
    >
      <form
        method="dialog"
        tabindex="-1"
      >
        <h2 id="alert-dialog-title">{{ title }}</h2>
        <p id="alert-dialog-content">{{ content }}</p>
        <menu class="dialog-menu">
          <button class="nes-btn">{{ cancel }}</button>
          <button
            class="nes-btn is-primary"
            type="submit"
            value="confirm"
          >
            {{ confirm }}
          </button>
        </menu>
      </form>
    </dialog>
  </section>
</template>

<style scoped lang="scss">
.alert-dialog {
  .dialog-menu {
    @apply flex justify-end;
  }
}
</style>
