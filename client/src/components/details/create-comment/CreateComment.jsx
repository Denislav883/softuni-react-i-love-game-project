import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";
import useForm from "../../../hooks/useForm";

export default function CreateComment({
    user,
    onCreate
}) {
    const { gameId } = useParams();
    const { request } = useRequest();

    const submitHandler = async ({ comment }) => {
        try {
            await request("http://localhost:3030/data/comments", "POST", {
                message: comment,
                gameId,
            });
            
            onCreate();
        } catch(err) {
            alert(err.message);
        }
    }

    const { register,formAction } = useForm(submitHandler, {
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