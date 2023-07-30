import React, { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { API } from '../../lib/api/api_main';
import { GameInterface } from '@/types/game';
import { useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();
  
 

  const [games, setGames] = useState<GameInterface[]>([]);
  const [game, setGame] = useState<Partial<GameInterface>>({
    title: '',
    description: '',
    img: '',
    price: 0,
    releaseDate: '',
    developer: '',
    video: '',
    genre: '',
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await API.get('/games/list');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleAddGame = async () => {
    try {
      if (game.releaseDate && game.releaseDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
        const releaseDateParts = game.releaseDate.split('-');
        const releaseDate = new Date(Number(releaseDateParts[2]), Number(releaseDateParts[1]) - 1, Number(releaseDateParts[0]));
        game.releaseDate = releaseDate.toISOString();
      } else {
        console.error('Invalid release date format');
        return;
      }

      if (!game.title || !game.description || !game.price || !game.developer || !game.genre) {
        console.error('Missing required fields');
        return;
      }

      console.log('Sending the following game data:', game);

      await API.post('/games/add', game);
      setGame({
        title: '',
        description: '',
        img: '',
        price: 0,
        releaseDate: '',
        developer: '',
        video: '',
        genre: '',
      });
      fetchGames();
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const handleDeleteGame = async (id: string) => {
    try {
      await API.delete(`/games/delete/${id}`);
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      <div className="mb-4">
        <input type="text" className="border p-2 mr-2" placeholder="Title" value={game.title || ''} onChange={(e) => setGame({ ...game, title: e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Description" value={game.description || ''} onChange={(e) => setGame({ ...game, description: e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Image URL" value={game.img || ''} onChange={(e) => setGame({ ...game, img: e.target.value })} />
        <input type="number" className="border p-2 mr-2" placeholder="Price" value={game.price || 0} onChange={(e) => setGame({ ...game, price: +e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Release Date" value={game.releaseDate || ''} onChange={(e) => setGame({ ...game, releaseDate: e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Developer" value={game.developer || ''} onChange={(e) => setGame({ ...game, developer: e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Genre" value={game.genre || ''} onChange={(e) => setGame({ ...game, genre: e.target.value })} />
        <input type="text" className="border p-2 mr-2" placeholder="Video URL" value={game.video || ''} onChange={(e) => setGame({ ...game, video: e.target.value })} />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddGame}>Add Game</button>
      </div>
      <div>
      {games.map((game) => {
        return (
          <div key={game._id} className="flex p-2 border-b items-start">
            <div>
              <h2 className="text-xl mb-2">{game.title}</h2> {/* Margen inferior para separar el título de la imagen */}
              <img src={game.img} alt={game.title} style={{ width: '200px', height: '250px' }} />
            </div>
            <div className="ml-5 mt-8"> 
              <div className="flex-grow"> {/* Crecimiento flexible para empujar el botón hacia abajo */}
                <p><strong>Description:</strong> {game.description}</p>
                <p><strong>Price:</strong> {game.price}</p>
                <p><strong>Release Date:</strong> {game.releaseDate}</p>
                <p><strong>Developer:</strong> {game.developer}</p>
                <p><strong>Genre:</strong> {game.genre}</p>
                <p><strong>Video URL:</strong> {game.video}</p>
              </div>
              <button className="bg-red-500 text-white p-1 rounded text-sm mt-5 " style={{ width: '100px' }} onClick={() => handleDeleteGame(game._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default Admin;


