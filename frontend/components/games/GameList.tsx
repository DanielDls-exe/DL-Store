import { GameCard } from './GameCard';
import { useGamesList } from './UseGame';
import 'twin.macro';

export const GamesList = () => {
  const list = useGamesList();


  return (
    <div tw="flex gap-4 flex-wrap w-full">
      {!list && <p>Loading...</p>}
      {Array.isArray(list) && list.map(game => <GameCard game={game} key={game._id} />)}
    </div>
  );
};


