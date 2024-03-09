<template>
  <main>
    <h1 :class="{ top: $route.name !== 'home' }">Catch Pokemon</h1>

    <router-view />
  </main>
</template>

<style scoped lang="scss">
main {
  @apply container h-screen mx-auto flex flex-col items-center justify-center;

  h1 {
    @apply text-2xl font-bold;
    @apply top-1/2;
    @apply transition-all duration-300 ease-in-out;

    &.top {
      @apply fixed top-0 text-xl;
    }
  }
}
</style>
