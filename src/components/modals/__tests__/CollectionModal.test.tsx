import { describe, it, expect, beforeAll, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CollectionModal from '@/components/modals/CollectionModal.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCollectionStore } from '@/stores/collection'
import { nextTick } from 'vue'

function addPikachuToCollection(store: any) {
  store.addToCollection({
    name: 'Pikachu',
    id: 25,
    url: 'img',
    sprites: { front_default: 'img' },
    height: 4,
    types: [{ type: { name: 'electrical' } }],
    stats: [{ base_stat: 20, stat: { name: 'speed' } }]
  })
}

function addOddishToCollection(store: any) {
  store.addToCollection({
    name: 'Oddish',
    id: 43,
    url: 'img',
    sprites: { front_default: 'img' },
    height: 5,
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    stats: [{ base_stat: 10, stat: { name: 'speed' } }]
  })
}

describe('CollectionModal', () => {
  it('renders a collection of pokemon and controls for sorting and filtering', async () => {
    const wrapper = shallowMount(CollectionModal, {
      global: {
        stubs: {
          ModalWindow: {
            template: `<div><slot aria="{ title: '', content: '' }" /></div>`
          }
        },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
          })
        ]
      }
    })

    const store = useCollectionStore()

    addPikachuToCollection(store)
    addOddishToCollection(store)

    await nextTick()

    /* Controls */
    const controls = wrapper.find('form.collection-modal__controls')

    const sort = controls.find('select')
    expect(sort.find('option:checked').attributes('value')).toBe('name')

    const filters = controls.findAll('input[type="checkbox"]')
    expect(filters[0].attributes('value')).toBe('electrical')
    expect(filters[1].attributes('value')).toBe('grass')
    expect(filters[2].attributes('value')).toBe('poison')

    /* Totals */
    const totals = wrapper.find('#collection-modal__totals').findAll('p')
    expect(totals[0].text()).toBe('Total Unique Pokemon: 2')
    expect(totals[1].text()).toBe('Total Captured Pokemon: 2')

    /* Pokemons */
    const pokemonsContainer = wrapper.find('.collection-modal__list')
    const pokemons = pokemonsContainer.findAll('.title')
    expect(pokemons[0].text()).toBe('Oddish (43)')
    expect(pokemons[1].text()).toBe('Pikachu (25)')
  })

  it('filters and sorts the collection of pokemon', async () => {
    const wrapper = shallowMount(CollectionModal, {
      global: {
        stubs: {
          ModalWindow: {
            template: `<div><slot aria="{ title: '', content: '' }" /></div>`
          }
        },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
          })
        ]
      }
    })

    const store = useCollectionStore()

    addPikachuToCollection(store)
    addOddishToCollection(store)
    addOddishToCollection(store)

    await nextTick()

    const controls = wrapper.find('form.collection-modal__controls')
    const totalsContainer = wrapper.find('#collection-modal__totals')

    /* Sort */
    const sort = controls.find('select')
    await sort.setValue('id')

    await nextTick()

    /* Totals */
    const totals = totalsContainer.findAll('p')
    expect(totals[0].text()).toBe('Total Unique Pokemon: 2')
    expect(totals[1].text()).toBe('Total Captured Pokemon: 3')

    /* Pokemons */
    const pokemonsContainer = wrapper.find('.collection-modal__list')
    const pokemons = pokemonsContainer.findAll('.title')
    expect(pokemons[0].text()).toBe('Pikachu (25)')
    expect(pokemons[1].text()).toBe('Oddish (43)')

    /* Filters */
    const filters = controls.findAll('input[type="checkbox"]')
    await filters[0].setValue(false) // electrical

    await nextTick()

    /* Totals */
    const totalsAfterFilter = totalsContainer.findAll('p')
    expect(totalsAfterFilter[0].text()).toBe('Total Unique Pokemon: 1')
    expect(totalsAfterFilter[1].text()).toBe('Total Captured Pokemon: 2')

    const pokemonsAfterFilter = pokemonsContainer.findAll('.title')
    expect(pokemonsAfterFilter.length).toBe(1)
    expect(pokemonsAfterFilter[0].text()).toBe('Oddish (43)')
  })
})
