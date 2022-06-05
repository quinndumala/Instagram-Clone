import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // call firebase service for user data
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { activeUser };
}

export default useUser;
