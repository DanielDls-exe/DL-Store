import { FastifyPluginAsync } from "fastify";
import { GameModel } from "../models/Game";

export const GamePlugin: FastifyPluginAsync = async (server) => {
  server.get("/list", async (request, reply) => {
    const games = await GameModel.find().lean();
    return reply.send(games);
  });

  server.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;
    const game = await GameModel.findById(id).lean();

    if (!game) {
      return reply.status(404).send({ error: 'Game not found' });
    }

    return reply.send(game);
  });

  server.post<{
    Body: {
      title: string;
      description: string; 
      genre: string;
      price: number; 
      releaseDate: string;
      developer: string;
      img: string;
      video: string;
    };
  }>("/add", async (request, reply) => {
    const { title, description, genre, price, releaseDate, developer, img, video } = request.body;

    const newGame = new GameModel({
      title,
      description, 
      genre,
      price, 
      releaseDate,
      developer,
      img,
      video
    });

    const doc = await newGame.save();
    console.log(`Created game with id ${doc._id}`);
    return reply.send(doc);
  });

  server.delete<{ Params: { id: string } }>("/delete/:id", async (request, reply) => {
    const { id } = request.params;

    await GameModel.findByIdAndDelete(id);

    return reply.send({ status: "deleted" });
  });
};
