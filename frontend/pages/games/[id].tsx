import { useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { GameInterface } from '@/types/game';
import { CartContext } from '../../lib/context/CartContext';
import { backendFetcher } from '../../lib/api/api_main';

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { dispatch } = useContext(CartContext);

  const { data: game, error } = useSWR<GameInterface>(id ? `/games/${id}` : null, backendFetcher);

  if (error) return <div>Error loading game.</div>;
  if (!game) return <div>Loading...</div>;

  const handleAddToCart = () => {
    console.log('Adding to cart:', game);
    dispatch({ type: 'ADD_ITEM', item: game });
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="game" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={game.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{game.title}</h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-4">DEVELOPER: {game.developer}</h2>
            <p className="leading-relaxed">{game.description}</p>
            <div className="flex flex-col mt-6 items-start pb-5 border-b-2 border-gray-200 mb-5">
              <div className="text-gray-600">Release Date: {game.releaseDate}</div>
              <div className="text-gray-900 text-2xl mt-2">Price: ${game.price.toFixed(2)}</div>
            </div>
            <div className="flex">
              <button onClick={handleAddToCart} className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
            </div>
            <div className="mt-6">
              <iframe src={game.video} title="Trailer" width="120%" height="380" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePage;
