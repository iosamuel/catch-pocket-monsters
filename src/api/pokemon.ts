export async function getPokemon(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json()
  return data as Pokemon
}
