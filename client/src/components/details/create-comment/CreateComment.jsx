import { useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router";

export default function CreateComment({
    user,
    onCreate
}) {
    const { gameId } = useParams();
    const [comment, setComment] = useState("");

    const changeHandler = (e) => {
        setComment(e.target.value);
    }

    const submitHandler = () => {
        try {
            request("http://localhost:3030/jsonstore/comments", "POST", {
                author: user.email,
                message: comment,
                gameId,
            });
            
            setComment("");
            onCreate();
        } catch(err) {
            alert(err.message);
        }
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