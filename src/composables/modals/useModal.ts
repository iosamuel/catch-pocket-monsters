export function useModal(id: string) {
  const openModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement
    modal.showModal()
  }

  const closeModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement
    modal.close()
  }

  return { openModal, closeModal }
}
