import GameCard from "../game-card/GameCard";   
import useRequest from "../../hooks/useRequest";

export default function Catalog() {
    const { data: games } = useRequest("http://127.0.0.1:5001/i-love-gamee/us-central1/server/data/games", []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>

            {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}

            <div className="catalog-container">
                {games.map(game => <GameCard key={game._id} {...game} />)}
            </div>

        </section>
    );
}