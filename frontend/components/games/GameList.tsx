import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../lib/context/CartContext';
import { useGamesList } from './UseGame';

const GamesList = () => {
  const { dispatch } = useContext(CartContext);
  const list = useGamesList();

  const handleAddToCart = (game) => {
    console.log('Adding to cart:', game);
    dispatch({ type: 'ADD_ITEM', item: game });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Available Games</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!list ? (
            <p>Loading...</p>
          ) : (
            list.map((game) => (
              <div key={game._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={game.img}
                    alt={game.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/games/${game._id}`}>
                        <span className="cursor-pointer">{game.title}</span>
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{game.developer}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${game.price.toFixed(2)}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link href={`/games/${game._id}`}>
                    <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      View More
                    </button>
                  </Link>
                  <button onClick={() => handleAddToCart(game)} type="button" className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export { GamesList };
