import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/user";
import usePhotos from "../hooks/use-photos";
import useUser from "../hooks/use-user";
import Photos from "./photos";

function Timeline() {
  const { user } = useContext(UserContext);
  const { uid: userId } = user;
  const { photos } = usePhotos(userId);
  console.log("callUsePhotos", photos);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={400} className="mb-5" />
        </>
      ) : (
        <Photos photos={photos} />
      )}
    </div>
  );
}

export default Timeline;
