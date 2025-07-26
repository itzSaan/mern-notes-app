import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";


const Login = () => {

  const { backendUrl, getUserData, setIsLoggedIn } = useContext(AppContext)

  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      
      if(state === 'signup') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password});
        if(data.success) {
          setIsLoggedIn(true)
          getUserData();
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {email, password});
        if(data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message)
    } 
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-700 from-50% to-blue-200 to-50%">
      <div className="w-[24rem] bg-white dark:bg-[#0e121a] dark:text-neutral-200 rounded-xl px-6 py-8 shadow-xl">
        {/* <img src="/notes-logo-dark.svg" alt="" className="h-16 mt-2 text-center w-full mt-0 border-b dark:border-[#222531]" /> */}
        <h2 className="text-3xl font-bold text-center mb-2">
          {state === "login" ? "Welcome Back" : "Welcome Abord"}
        </h2>
        <p className="text-sm dark:text-neutral-400 text-center mb-6">
          {state === "login" ? "Login using your credentials" : "Signup by providing details below"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state === "signup" && (
            <div className="flex items-center  gap-2 relative mb-4">
              <input
                type="name"
                name="name"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="relative p-4 pl-12 border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.25}
                stroke="currentColor"
                className="absolute text-gray-500 inset-4 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
          <div className="flex items-center  gap-2 relative mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="relative p-4 pl-12 border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute text-gray-500 inset-4 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="flex items-center  gap-2 relative mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="relative p-4 pl-12 border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="absolute text-gray-500 inset-4 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>
          {state === "login" && (
            <p className="text-blue-600 w-max cursor-pointer font-medium mb-4" onClick={() => navigate('/reset-password')}>Forgot Password ?</p>
          )}

{state === "login" &&
          <button
            type="submit"
            className="relative p-4 bg-blue-600 text-white w-full rounded-lg mb-4"
          > Login
          </button>
            }

            {state === "signup" &&
          <button
            type="submit"
            className="relative p-4 bg-blue-600 text-white w-full rounded-lg mb-4"
          > Sign up
          </button>
            }
          {state === "login" ? (
            <p className="text-gray-500 font-medium text-center">
              Don{"'"}t have an account?{" "}
              <span
                className="text-blue-500 font-medium cursor-pointer"
                onClick={() => setState("signup")}
              >
                Register
              </span>
            </p>
          ) : (
            <p className="text-gray-500 dark:text-neutral-500 font-medium text-center">
              Already have an account?{" "}
              <span
                className="text-blue-500 font-medium cursor-pointer"
                onClick={() => setState("login")}
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
