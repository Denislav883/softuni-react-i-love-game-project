import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";
import useForm from "../../../hooks/useForm";
import {v4 as uuid} from "uuid";

export default function CreateComment({
    user,
    onCreateStart,
    onCreateEnd
}) {
    const { gameId } = useParams();
    const { request } = useRequest();

    const submitHandler = async ({ comment }) => {
        const data = {
            _id: uuid(),
            message: comment,
            gameId,
        };

        onCreateStart(data);

        try {
            const createdComment = await request("http://localhost:3030/data/comments", "POST", data);

            onCreateEnd(createdComment);
        } catch (err) {
            alert(err.message);
        }
    }

    const { register, formAction } = useForm(submitHandler, {
        comment: ""
    });

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={formAction}>
                <textarea
                    {...register("comment")}
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