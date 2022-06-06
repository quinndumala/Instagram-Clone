import PropTypes from "prop-types";
import React, { useRef } from "react";
import Actions from "./actions";
import Footer from "./footer";
import Header from "./header";
import Image from "./image";

function Post({ content }) {
  const commentInput = useRef(null);
  const handleCommentInputFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        isLikedPhoto={content.isLikedByUser}
        handleFocus={handleCommentInputFocus}
      />
      <Footer caption={content.caption} username={content.username} />
    </div>
  );
}

export default Post;

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    isLikedByUser: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
