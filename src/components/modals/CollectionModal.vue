<script setup lang="ts">
import { computed, ref } from 'vue'

import ModalWindow from '@/components/ui/ModalWindow.vue'

import { useCollectionStore } from '@/stores/collection'
import { useSort } from '@/composables/useSort'
import { useFilters } from '@/composables/useFilters'
import { useFilter } from '@/composables/collection/useFilter'

const { collection } = useCollectionStore()

const sortCriteria = [
  { label: 'Name', value: 'name', selected: true },
  { label: 'ID', value: 'id' },
  { label: 'Height', value: 'height' },
  { label: 'Speed', value: 'speed' }
]

// Get all unique types in the collection
const typesInCollection = computed(() => {
  const types = new Set<string>()
  collection.forEach((pokemon) => {
    pokemon.types.forEach(({ type }) => {
      types.add(type.name)
    })
  })
  return Array.from(types)
})

const sort = ref('name')
const { filters } = useFilters(typesInCollection)

const { filteredList } = useFilter(collection, filters)
const { sortedList } = useSort(filteredList, sort)

const totalCapturedPokemon = computed(() =>
  filteredList.value.reduce((acc, pokemon) => acc + pokemon.quantity, 0)
)
</script>

<template>
  <ModalWindow id="collection-modal">
    <template #="{ aria: { title, content } }">
      <h2 :="title">My Collection</h2>
      <section
        :="content"
        class="collection-modal"
      >
        <form class="collection-modal__controls">
          <section>
            <label for="collection-modal__sort">Sort by:</label>
            <div class="nes-select is-dark">
              <select
                id="collection-modal__sort"
                v-model="sort"
              >
                <option
                  v-for="{ value, selected, label } in sortCriteria"
                  :key="value"
                  :value="value"
                  :selected="selected"
                >
                  {{ label }}
                </option>
              </select>
            </div>
          </section>

          <section>
            <p id="collection-modal__filter">Filter by type:</p>
            <div class="collection-modal__controls--filters">
              <label
                v-for="({ label, value }, index) in filters"
                :key="value"
              >
                <input
                  type="checkbox"
                  class="nes-checkbox is-dark"
                  aria-describedby="collection-modal__filter"
                  v-model="filters[index].checked"
                  :value
                />
                <span>{{ label }}</span>
              </label>
            </div>
          </section>
        </form>

        <ul
          class="collection-modal__list"
          aria-labelledby="collection-modal__totals"
        >
          <li
            v-for="pokemon in sortedList"
            :key="pokemon.id"
            class="nes-container is-dark with-title"
            tabindex="0"
          >
            <span class="title"
              >{{ pokemon.name }} (<span aria-label="id">{{ pokemon.id }}</span
              >)</span
            >

            <img
              :src="pokemon.sprites.front_default"
              :alt="pokemon.name"
            />
            <ul>
              <li>height: {{ pokemon.height }}</li>
              <li>speed: {{ pokemon.speed }}</li>
              <li>
                <span>type:</span>
                <span
                  v-for="{ type: { name } } in pokemon.types"
                  :key="name"
                >
                  {{ name }}
                </span>
              </li>
            </ul>
          </li>
        </ul>

        <footer
          id="collection-modal__totals"
          class="collection-modal__filter-summary"
        >
          <p>Total Unique Pokemon: {{ filteredList.length }}</p>
          <p>Total Captured Pokemon: {{ totalCapturedPokemon }}</p>
        </footer>
      </section>
    </template>
  </ModalWindow>
</template>

<style scoped lang="scss">
.collection-modal {
  @apply mt-8 grid grid-cols-1 gap-8;

  &__controls {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4;

    &--filters {
      @apply grid grid-cols-1 md:grid-cols-3 gap-4;
    }
  }

  &__list {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;

    li {
      @apply flex flex-col place-items-center p-2;
    }
  }
}
</style>
@/composables/collection/useFilter
