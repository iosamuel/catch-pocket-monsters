import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AlertDialog from '@/components/ui/AlertDialog.vue'

describe('AlertDialog', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  it('opens dialog and resets returnValue', async () => {
    const wrapper = mount(AlertDialog, {
      slots: {
        default: '<button @click="clickFn">Open Dialog</button>'
      }
    })

    const dialog = wrapper.find('dialog')

    await wrapper.find('button').trigger('click')

    // Check if dialog is opened
    expect(dialog.element.returnValue).toBe('')
    expect(dialog.element.showModal).toBeCalled()
  })

  it('emits closeConfirm when dialog is closed with confirm returnValue', async () => {
    const wrapper = mount(AlertDialog, {
      slots: {
        default: '<button @click="clickFn">Open Dialog</button>'
      }
    })

    const dialog = wrapper.find('dialog')

    // Open the dialog
    await wrapper.find('button').trigger('click')

    // Close the dialog with confirm returnValue
    dialog.element.returnValue = 'confirm'
    await dialog.trigger('close')

    expect(wrapper.emitted()).toHaveProperty('closeConfirm')
  })
})
