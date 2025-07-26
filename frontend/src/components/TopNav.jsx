import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const TopNav = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, setIsLoggedIn, setUserData } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/user/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/user/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // toast(`Welcome ${userData.name}`, {position: "top-center"}) 

  return (
    <div className="hidden xl:block bg-white dark:bg-[#0e121a] dark:text-neutral-300 border-b dark:border-b dark:border-[#222531] px-6 py-4 xl:flex items-center gap-4 col-span-4 fixed top-0 left-[18rem] right-0 z-10">
      <h2 className="text-2xl font-bold mr-auto">All Notes</h2>
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search by title, content, or tags..."
          className="p-3 pl-10 bg-transparent dark:text-neutral-300 border border-neutral-300 dark:border-[#222531] rounded-lg max-w-[300px] w-96 focus:outline-blue-500/50 dark:outline-blue-500/50"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="size-6 text-gray-400 absolute inset-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <button className="relative group p-3 flex content-center text-gray-500 dark:text-neutral-400 dark:border-[#222531] rounded-lg hover:bg-[#f4f5f9] hover:text-gray-700 dark:hover:bg-[#222531] dark:hover:text-neutral-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      <button className="relative group w-12 h-12 flex items-center bg-[#f4f5f9] dark:bg-[#222531] justify-center text-xl content-center text-gray-500 dark:text-neutral-400 dark:border-[#222531] rounded-lg hover:bg-[#f2f3f7] hover:text-gray-700 dark:hover:bg-[#222531] dark:hover:text-neutral-300">
        {userData.name[0].toUpperCase()}
        <div className="absolute hidden group-hover:block top-12 overflow-hidden right-0 z-10 text-black dark:text-white/50 w-40 border border-neutral-300 dark:border-[#222531] rounded-lg">
          <ul className="list-none text-start m-0 bg-white dark:bg-[#0e121a] dark:text-neautral-300 rounded text-sm">
            {!userData.isUserVerified && (
              <li
                onClick={() => sendVerificationOtp()}
                className="p-3 hover:bg-[#f4f5f9] dark:hover:bg-[#222531] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.25}
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
                Verify Email
              </li>
            )}
            <li
              onClick={() => logout()}
              className="p-3 hover:bg-[#f4f5f9] dark:hover:bg-[#222531] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.25}
                stroke="currentColor"
                className="size-6 inline mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </li>
          </ul>
        </div>
      </button>

      <div className="hidden group-hover:block absolute z-9 bg-slate-700 top-20 right-6 p-2  rounded w-38">
        <p className="p-2 rounded cursor-pointer hover:bg-slate-900">
          Toogle Dark mode
        </p>
        <p className="p-2 rounded cursor-pointer hover:bg-slate-900">Login</p>
      </div>
    </div>
  );
};

export default TopNav;
