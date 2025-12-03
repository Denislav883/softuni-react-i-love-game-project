import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";

export default function Edit() {
    const editGmaeHandler = async (values) => {
        try {
            await request(`http://localhost:3030/data/games/${gameId}`, "PUT", values);

            navigate(`/games/${gameId}/details`);
        } catch (err) {
            alert(err.message);
        }
    }

    const { register, formAction, setValues } = useForm(editGmaeHandler, {
        title: '',
        genre: '',
        players: '',
        date: '',
        imageUrl: '',
        summary: ''
    });

    const navigate = useNavigate();
    const { gameId } = useParams();
    const { request } = useRequest(`http://localhost:3030/data/games/${gameId}`, {});

    useEffect(() => {
        request(`http://localhost:3030/data/games/${gameId}`)
            .then(result => {
                setValues(result);
            })
            .catch(err => {
                alert(err.message);
            })
    }, [gameId, setValues]);

    return (
        <section id="edit-page">
            <form id="add-new-game" action={formAction}>
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            {...register("title")}
                            placeholder="Enter game title..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            {...register("genre")}
                            placeholder="Enter game genre..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input
                            type="number"
                            id="activePlayers"
                            {...register("players")}
                            min="0"
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            {...register("date")}
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            {...register("imageUrl")}
                            placeholder="Enter image URL..."
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            {...register("summary")}
                            id="summary"
                            rows="5"
                            placeholder="Write a brief summary..."
                        ></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </form>
        </section>
    );
}