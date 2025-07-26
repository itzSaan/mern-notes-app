import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const LeftSidebar = () => {

  const {allTags} = useContext(AppContext);
  
  const [isAvtive, setIsActive] = useState(true);

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');


  return (
    <div className="hidden xl:block bg-white dark:bg-[#0e121a] py-4 px-6 h-full max-w-sm w-[18rem] fixed left-0 top-0 bottom-0 border-r dark:border-r dark:border-[#222531] font-medium row-span-3">
      <img src={ prefersDarkScheme.matches ? "/notes-logo-dark.svg" : "/notes-logo.svg"} alt="Notes" className="w-28 shrink-0" />
      <div className="flex flex-col gap-y-2 py-3 border-b dark:border-b dark:border-[#222531]">
        <a
          href="/"
          className={` flex items-center gap-2 text-slate-900 dark:text-neutral-400 p-3 rounded-md ${isAvtive && "bg-[#f4f5f9] dark:bg-[#222531]"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke={isAvtive ? "#325cfe" : "currentColor"}
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>All Notes</span>
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </a>
        <a
          href="/archived-notes"
          className={`flex gap-2 text-slate-900 dark:text-neutral-400 p-3 rounded-md`}
        >
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
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          <span>Archieved Notes</span>
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </a>
      </div>
      <div className="pt-3 h-full pb-8 overflow-y-auto scrollbar">
        <p className="text-gray-500 dark:text-neutral-500 font-medium text-md">Tags</p>
        <div>
          {allTags.map((tag, i) => (
            <a
            key={i}
            href=""
            className="flex gap-2 text-slate-900 dark:text-neutral-400 p-3"
          >
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
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6Z"
              />
            </svg>
            <span>{tag}</span>
          </a>
          ))}
          

        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
