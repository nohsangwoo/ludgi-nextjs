import { CardForRickAndMorty } from './CardForRickAndMorty'

interface CardListForRickAndMortyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
}

export const CardListForRickAndMorty = ({
  results,
}: CardListForRickAndMortyProps) => {
  console.log('results: ', results)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {results?.map((character: any) => (
        <CardForRickAndMorty character={character} key={character.id} />
      ))}
    </div>
  )
}
