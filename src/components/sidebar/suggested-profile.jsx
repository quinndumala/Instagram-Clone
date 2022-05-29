import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateProfileFollowers,
  updateUserFollowing,
} from "../../services/firebase";

function SuggestedProfile({
  profileDocId,
  profileUsername,
  profileUserId,
  userId,
  userDocId,
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowProfile = async () => {
    setFollowed(true);

    await updateUserFollowing(userDocId, profileUserId, false);

    await updateProfileFollowers(profileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${profileUsername}.jpg`}
          alt="profile_image"
        />
        <Link to={`/p/${profileUsername}`}>
          <p className="font-bold text-sm">{profileUsername}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowProfile}
      >
        Follow
      </button>
    </div>
  ) : null;
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  profileUsername: PropTypes.string.isRequired,
  profileUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
