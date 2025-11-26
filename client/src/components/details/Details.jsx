import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import CreateComment from "./create-comment/CreateComment";
import DetailsComments from "./details-comments/DetailsComments";

const baseUrl = "http://localhost:3030/jsonstore/games"

export default function Details({
    user
}) {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        fetch(`${baseUrl}/${gameId}`)
            .then(response => response.json())
            .then(result => setGame(result))
            .catch(err => alert(err.message));
    }, [gameId]);

    const deleteGameHandler = async () => {
        const isConfirm = confirm(`Are you sure you want to delete game: ${game.title}`);

        if (!isConfirm) {
            return;
        }

        try {
            await fetch(`${baseUrl}/${gameId}`, {
                method: "DELETE"
            });

            navigate("/games");
        } catch(err) {
            alert("Unable to delete game: ", err.message);
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="header-and-image">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />

                    <div className="meta-info">
                        <h1 className="game-name">{game.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{game.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">{game.players}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{game.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {game.summary}
                        </p>
                    </div>
                </div>


                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    {/* <Link to={`/games/${gameId}/delete`} className="button">Delete</Link> */}
                    <button className="button" onClick={deleteGameHandler}>Delete</button>
                </div>

                <DetailsComments />
            </div>
            
            <CreateComment />
        </section>
    );
}