import { useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router";

export default function CreateComment({
    user
}) {
    const { gameId } = useParams();
    const [comment, setComments] = useState("");

    const changeHandler = (e) => {
        setComments(e.target.value);
    }

    const submitHandler = () => {
        request("http://localhost:3030/jsonstore/comments", "POST", {
            author: user.email,
            message: comment,
            gameId,
        });
    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={submitHandler}>
                <textarea 
                name="comment" 
                onChange={changeHandler} 
                value={comment} 
                placeholder="Comment......" 
                ></textarea>
                <input 
                    className="btn submit" 
                    type="submit" 
                    value="Add Comment" 
                    disabled={!user}
                />
            </form>
        </article>
    );
}