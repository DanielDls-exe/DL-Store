import { GamesList } from "@/components/games/GameList";

const Games = () => {
  return (
    <div>
      <section tw="flex justify-center items-center flex-col gap-8">
        <GamesList />
      </section>
    </div>
  );
};

export default Games;
