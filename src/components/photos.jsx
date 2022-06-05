import React from "react";
import PropTypes from "prop-types";

function Photos({ photos }) {
  console.log("photos", photos);
  return (
    <>
      {photos.length > 0 ? (
        photos.map((content) => <p key={content.docId}>content.imageSrc</p>)
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
