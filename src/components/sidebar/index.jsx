import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

function Sidebar() {
  const { activeUser } = useUser();
  const { docId, fullName, username, userId, following } = activeUser;
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} userDocId={docId} />
    </div>
  );
}

export default Sidebar;
