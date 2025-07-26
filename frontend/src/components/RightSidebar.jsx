import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RightSidebar = () => {
  const {note, archiveNote} = useContext(AppContext);

  return (
    <div className="hidden xl:block bg-white dark:bg-[#0e121a] p-6 h-full fixed right-0 top-[81px] w-[18rem] font-medium border-l dark:border-l dark:border-[#222531] z-0">
      <button onClick={() => archiveNote(note._id, note)} className="border border-neutral-300 dark:border-[#222531] rounded-lg w-full flex align-center gap-2 p-3 dark:text-neutral-400 mb-3 hover:bg-[#f4f5f9] hover:dark:bg-[#222531]">
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
        Archive Note
      </button>
      <button className="border border-neutral-300 dark:border-[#222531] rounded-lg w-full flex align-center gap-2 p-3 dark:text-neutral-400 hover:bg-[#f4f5f9] hover:dark:bg-[#222531]">
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        Delete Note
      </button>
    </div>
  );
};

export default RightSidebar;
