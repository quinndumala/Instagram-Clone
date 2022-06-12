import { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import { addComment } from "../../services/firebase";

function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setComments([{ displayName, comment }, ...comments]);

    await addComment(displayName, comment, docId);
    setComment("");
  };

  return (
    <>
      <div className="border-t border-gray-primary">
        <form
          className="flex justify-between pl-0 pr-5"
          method="POST"
          onSubmit={(e) =>
            comment.length >= 1 ? handleSubmit(e) : e.preventDefault()
          }
        >
          <input
            aria-label="Add a comment"
            autoComplete="off"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4"
            type="text"
            name="add-comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            ref={commentInput}
          />
          <button
            className={`text-sm font-bold text-blue-medium ${
              !comment && "opacity-25"
            }`}
            type="button"
            disabled={!comment}
            onClick={handleSubmit}
          >
            POST
          </button>
        </form>
      </div>
    </>
  );
}

export default AddComment;

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
