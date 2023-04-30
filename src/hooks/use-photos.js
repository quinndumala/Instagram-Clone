import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

function usePhotos(userId) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      //   const test = await getUserByUserId(userId);
      //   console.log("test", test);
      const [{ following }] = await getUserByUserId(userId);
      let timelinePhotos = [];

      if (following.length > 0) {
        timelinePhotos = await getPhotos(userId, following);
      }

      timelinePhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(timelinePhotos);
    };

    if (userId) getTimelinePhotos();
  }, []);

  return { photos };
}

export default usePhotos;
