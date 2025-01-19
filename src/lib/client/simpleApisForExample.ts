import axios from 'axios'

export const getAllRickAndMortyCharacters = async (page: number) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  )
  return data
}

export const getSingleRickAndMortyCharacter = async (id: string) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`,
  )
  return data
}
