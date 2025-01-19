import Image from 'next/image'

interface CardForRickAndMortyProps {
  character: {
    id: number;
    name: string;
    image: string;
  };
}

export const CardForRickAndMorty = ({
  character,
}: CardForRickAndMortyProps) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="text-lg font-medium text-gray-700">{character.name}</div>
    </div>
  )
}
