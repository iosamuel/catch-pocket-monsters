import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalWindow from '@/components/ui/ModalWindow.vue'

describe('ModalWindow', () => {
  it('renders with correct id and arias', () => {
    const wrapper = mount(ModalWindow, {
      props: {
        id: 'test-id'
      },
      slots: {
        default: '<div :title="aria.title.id" :content="aria.content.id"></div>'
      }
    })

    const dialog = wrapper.find('dialog')

    expect(dialog.attributes('id')).toBe('test-id')
    expect(dialog.attributes('aria-labelledby')).toBe('modal-window-title')
    expect(dialog.attributes('aria-describedby')).toBe('modal-window-content')

    const content = wrapper.find('section.modal-window__content')
    expect(content.find('div').attributes('title')).toBe('modal-window-title')
    expect(content.find('div').attributes('content')).toBe('modal-window-content')
  })
})
