import PropTypes from "prop-types";

function Image({ src, caption }) {
  return <img src={src} caption={caption} alt={caption} />;
}

export default Image;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
