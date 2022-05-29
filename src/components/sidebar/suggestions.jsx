import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { getSuggestedUsers } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

function Suggestions({ userId, following, userDocId }) {
  const [profiles, setProfiles] = useState("");

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedUsers(userId, following);
      console.log("Suggestions", response);
      setProfiles(response);
    };

    if (userId && following) suggestedProfiles();
  }, [userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} className="mt-5" />;
  }

  return profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            profileUsername={profile.username}
            profileUserId={profile.userId}
            userId={userId}
            userDocId={userDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  userDocId: PropTypes.string,
};
