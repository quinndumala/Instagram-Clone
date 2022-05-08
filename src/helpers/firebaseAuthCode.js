export function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
    case "auth/wrong-password":
      return "Passowrd is incorrect";

    case "auth/invalid-email":
      return "Email address is incorrect";

    case "auth/user-not-found":
      return "User was not found";

    default:
      return "";
  }
}
