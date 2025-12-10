import GameCard from "../game-card/GameCard";   
import useRequest from "../../hooks/useRequest";

export default function Catalog() {
    const { data: games } = useRequest(`${import.meta.env.VITE_APP_SERVER_URL}/data/games`, []);

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