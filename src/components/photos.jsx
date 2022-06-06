import React from "react";
import PropTypes from "prop-types";
import Post from "./post";

function Photos({ photos }) {
  console.log("photos", photos);
  return (
    <>
      {photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </>
  );
}

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array,
};
