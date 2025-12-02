import { useNavigate } from "react-router";
import request from "../../utils/request";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";

export default function Create() {
    const navigate = useNavigate();
    const { request } = useRequest()

    const createGameHandler = async (values) => {
        const data = values;

        data.players = Number(data.players);
        data._createdOn = Date.now();

        try {
            await request("http://localhost:3030/data/games", "POST", data);

            navigate("/games");
        } catch (err) {
            alert(err.message)
        }
    }

    const { register, formAction } = useForm(createGameHandler, {
        title: "",
        genre: "",
        players: "",
        date: "",
        imageUrl: "",
        summary: ""
    })

    return (
        // < !--add Page(Only for logged -in users) -->
        <section id="add-page">
            <form id="add-new-game" action={formAction}>
                <div className="container">

                    <h1>Add New Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" {...register("title")} placeholder="Enter game title..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" {...register("genre")} placeholder="Enter game genre..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" {...register("players")} min="0" placeholder="0" />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" {...register("date")} />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" {...register("imageUrl")} placeholder="Enter image URL..." />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea {...register("summary")} id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="ADD GAME" />
                </div>
            </form>
        </section>
    );
}