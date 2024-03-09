type Pokemon = {
  id: number
  name: string
  url: string
  sprites: {
    front_default: string
  }
  height: number
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
}

type PokemonInCollection = Pokemon & { speed: number; quantity: number }

type Filter = { label: string; value: string; checked: boolean }
