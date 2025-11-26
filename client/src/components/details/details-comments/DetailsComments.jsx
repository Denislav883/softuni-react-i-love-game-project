import { useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../../../utils/request";

export default function DetailsComments({
    refresh
}) {
    const [comments, setComments] = useState([]);
    const { gameId } = useParams();

    useEffect(() => {
        request("http://localhost:3030/jsonstore/comments")
            .then(result => {
                const gameComments = Object.values(result).filter(comment => comment.gameId === gameId);
                setComments(gameComments);
            })
    }), [gameId, refresh];

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id} className="comment">
                        <p>{comment.author}: {comment.message}</p>
                    </li>
                ))}
            </ul>
            
            {!comments.length === 0 && (
                <p className="no-comment">No comments.</p>
            )}
        </div>
    );
}