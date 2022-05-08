import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { validateEmail } from "../helpers/handlers";
import { mapAuthCodeToMessage } from "../helpers/firebaseAuthCode";
import FloatLabelInput from "../components/floatLabelInput";

function Login() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const INIT_VALUES = {
    emailAddress: "",
    password: "",
  };

  // const [emailAddress, setEmailAddress] = useState("");
  // const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(INIT_VALUES);
  const [error, setError] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const isInvalid = !isEmailValid || loginState.password === "";

  const handleStateChange = (e) => {
    const { value } = e.target;
    setLoginState({ ...loginState, [e.target.name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const { emailAddress, password } = loginState;

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // setEmailAddress("");
      // setPassword("");
      // setLoginState(INIT_VALUES);
      console.log("error:", error);
      const message = mapAuthCodeToMessage(error.code);
      setError(message);
    }
  };

  useEffect(() => {
    document.title = "Login • Instagram";
    console.log("loginState.password === '' ", loginState.password === "");
  }, []);

  useEffect(() => {
    setIsEmailValid(validateEmail(loginState.emailAddress));
  }, [loginState.emailAddress]);

  useEffect(() => {
    console.log("loginState", loginState);
  }, [loginState]);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-2/3 mb-4"
            />
          </h1>

          <form className="w-full" onSubmit={handleLogin} method="POST">
            <FloatLabelInput
              name="emailAddress"
              type="text"
              label="Email Address"
              onChange={handleStateChange}
            />

            <FloatLabelInput
              name="password"
              type="password"
              label="Password"
              onChange={handleStateChange}
            />
            {/* <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            /> */}
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold 
            ${isInvalid && "opacity-50"}`}
            >
              Login
            </button>
          </form>

          {error && <p className="text-xs text-red-primary pt-5">{error}</p>}
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-xs">
            Don't have an account?
            {` `}
            <Link to={ROUTES.SIGN_UP} className="text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
