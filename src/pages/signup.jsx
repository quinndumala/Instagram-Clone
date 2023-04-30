import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { validateEmail } from "../helpers/handlers";
import { mapAuthCodeToMessage } from "../helpers/firebaseAuthCode";
import FloatLabelInput from "../components/floatLabelInput";
import { doesUsernameExist } from "../services/firebase";

function SignUp() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  // const [emailAddress, setEmailAddress] = useState("");
  // const [fullName, setFullName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const INIT_VALUES = {
    emailAddress: "",
    fullName: "",
    username: "",
    password: "",
  };

  const [signUpState, setSignUpState] = useState(INIT_VALUES);

  const [error, setError] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const isInvalid =
    !isEmailValid ||
    signUpState.username === "" ||
    signUpState.fullName === "" ||
    signUpState.password === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userExists = await doesUsernameExist(signUpState.username);

    if (userExists) return setError("Username is already taken.");

    setError("");
    try {
      const { emailAddress, fullName, username, password } = signUpState;
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      // for firestore auth user
      await createdUserResult.user.updateProfile({
        displayName: username,
      });

      // for app user (profile)
      await firebase.firestore().collection("users").add({
        userId: createdUserResult.user.uid,
        username: username.toLowerCase(),
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        following: [],
        dateCreated: Date.now(),
      });

      navigate.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.log("error: ", error);
      const message = mapAuthCodeToMessage(error.code);
      setError(message);
      // setSignUpState(INIT_VALUES);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSignUpState({
      ...signUpState,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("signUpState", signUpState);
    // });
  }, [signUpState]);

  useEffect(() => {
    document.title = "Sign Up • Instagram";
  }, []);

  useEffect(() => {
    setIsEmailValid(validateEmail(signUpState.emailAddress));
  }, [signUpState.emailAddress]);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-2/3 mb-4"
            />
          </h1>
          <p className="mb-6 text-gray-text text-center font-semibold">
            Sign up to see photos and videos from your friends
          </p>

          <form className="w-full" onSubmit={handleSignUp} method="POST">
            {/* <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            /> */}
            {/* <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
              value={userName}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            /> */}

            <FloatLabelInput
              name="emailAddress"
              type="text"
              label="Email Address"
              onChange={handleChange}
            />

            <FloatLabelInput
              name="fullName"
              type="text"
              label="Full Name"
              onChange={handleChange}
            />

            <FloatLabelInput
              name="username"
              type="text"
              label="Username"
              onChange={handleChange}
            />
            <FloatLabelInput
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold 
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
            <div className="flex justify-center mt-5">
              <p className="text-center text-tiny text-gray-text">
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </p>
            </div>
          </form>

          {error && <p className="text-tiny text-red-primary pt-5">{error}</p>}
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-xs">
            Have an account?
            {` `}
            <Link to={ROUTES.LOGIN} className="text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
