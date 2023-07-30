import mongoose from "mongoose";
import { DB_URI } from "./config";
import { GameModel } from "./models/Game";

const createGame = async () => {
  const gameData = {
    title: "Battlefield 3",
    description: "Battlefield 3 es un videojuego de disparos en primera persona desarrollado por EA DICE y publicado por Electronic Arts en el año 2011.",
    price: 19.99,
    img: "https://upload.wikimedia.org/wikipedia/en/6/69/Battlefield_3_Game_Cover.jpg",
    developer: "EA DICE",
    releaseDate: new Date('2011-10-25'),
    genre: "First-person shooter",
    video: "https://www.youtube.com/embed/O7vJMYMX7AM",
  };

  // Imprimiendo los datos antes de enviarlos
  console.log("Sending the following game data:");
  console.log(JSON.stringify(gameData, null, 2));

  const game = await GameModel.create(gameData);

  console.log(`✅ Game saved with id: ${game._id}`);
};

(async () => {
  await mongoose.connect(DB_URI);
  console.log("✅ DB Conectada");

  try {
    await GameModel.collection.drop();
  } catch (err) {
    console.log("⛔ Data does not found");
  }

  await createGame();

  await mongoose.disconnect();
  console.log("⛔ DB Desconectada");
})();
