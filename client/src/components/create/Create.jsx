import { useNavigate } from "react-router";

export default function Create() {
    const navigate = useNavigate();

    const createGameHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        data.players = Number(data.players);
        data._createdOn = Date.now();

        const response = await fetch("http://localhost:3030/jsonstore/games", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
            
        const result = await response.json();

        navigate("/games");
    }

    return (
        // < !--add Page(Only for logged -in users) -->
        <section id="add-page">
            <form id="add-new-game" onSubmit={createGameHandler}>
                <div class="container">

                    <h1>Add New Game</h1>

                    <div class="form-group-half">
                        <label for="gameName">Game Name:</label>
                        <input type="text" id="gameName" name="title" placeholder="Enter game title..." />
                    </div>

                    <div class="form-group-half">
                        <label for="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" placeholder="Enter game genre..." />
                    </div>

                    <div class="form-group-half">
                        <label for="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" name="players" min="0" placeholder="0" />
                    </div>

                    <div class="form-group-half">
                        <label for="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="date" />
                    </div>

                    <div class="form-group-full">
                        <label for="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter image URL..." />
                    </div>

                    <div class="form-group-full">
                        <label for="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input class="btn submit" type="submit" value="ADD GAME" />
                </div>
            </form>
        </section>
    );
}