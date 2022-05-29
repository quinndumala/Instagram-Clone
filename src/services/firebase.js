import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data()).length > 0;
};

export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedUsers = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .limit(10)
    .where("userId", "!=", userId)
    .get();

  const users = result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((item) => !following.includes(item.userId));

  return users;
};

export const updateUserFollowing = async (
  userDocId,
  profileUserId,
  isFollowingProfile
) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileUserId)
        : FieldValue.arrayUnion(profileUserId),
    });
};

export const updateProfileFollowers = async (
  profileDocId,
  userID,
  isFollowingProfile
) => {
  firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userID)
        : FieldValue.arrayUnion(userID),
    });
};
