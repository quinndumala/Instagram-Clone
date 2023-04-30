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

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const followedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    followedPhotos.map(async (photo) => {
      let isLikedByUser = false;

      if (photo.likes.includes(userId)) {
        isLikedByUser = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, isLikedByUser };
    })
  );

  return photosWithUserDetails;
};

export const addComment = async (displayName, comment, docId) => {
  firebase
    .firestore()
    .collection("photos")
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion({ displayName, comment }),
    });
};

export const addPostLike = async (docId, userId, toggleLiked) => {
  firebase
    .firestore()
    .collection("photos")
    .doc(docId)
    .update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};
