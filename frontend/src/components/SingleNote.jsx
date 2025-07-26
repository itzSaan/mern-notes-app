import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const SingleNote = () => {
  const { backendUrl, note, setNote } = useContext(AppContext);
  const [updatedNote, setUpdatedNote] = useState(note);

  const saveNote = async (id) => {
    try {
      const noteToSave = {
          ...note,
          title: updatedNote.title,
          tags: updatedNote.tags,
          data: updatedNote.data,
        };
    
      console.log(updatedNote)
      const { data } = await axios.put(backendUrl + `/api/notes/${id}`, noteToSave);
      if (data.success) {
        setNote(data.note) 
        toast.success('Note Saved successfully!')
      } else {
          toast.error("Data Wont saved" + data.message);
        } 
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log(note);
  return (
    <div className="p-4 md:p-6 bg-white dark:bg-[#0e121a] dark:text-neutral-300 w-ful fixed top-[81px] left-[38rem] right-[18rem] bottom-0 h-ful xl:col-span-2 xl:row-span-2">
      {/* Note mobile menu */}
      <div className="xl:hidden flex md:gap-2 pb-3 border-b dark:border-[#222531] items-center">
        <button className="flex items-center md:gap-2 mr-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="size-5 md:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Go Back
        </button>

        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="size-5 md:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </button>
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="size-5 md:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button className="p-2">Cancel</button>
        <button className="p-2 text-blue-600">Save Note</button>
      </div>

      {/*  Note Header */}
      <div className="py-2 xl:py-0 border-b dark:border-b dark:border-[#222531]">
        <h2
          className="text-2xl font-bold dark:font-medium mb-4"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) =>
            setUpdatedNote({ ...updatedNote, title: e.target.innerText })
          }
          dangerouslySetInnerHTML={{ __html: note ? note.title : "Write Note Title here..." }}
        ></h2>
        <div className="grid grid-cols-[repeat(2,_minmax(auto,120px))] mb-4 gap-2">
          <p className="flex gap-2">
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
            <span>Tags</span>
          </p>
          <p>{note ? note.tags.join(", ") : "Enter tags..."}</p>
          <p className="flex gap-2">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>Last edited</span>
          </p>
          <p>{note ? note.date.slice(0, 10) : Date.now('MM-DD-YYYY')}</p>
        </div>
      </div>

      {/* Editable Content Area */}
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={(e) =>
          setUpdatedNote({ ...updatedNote, data: e.target.innerHTML })
        }
        dangerouslySetInnerHTML={{ __html: note ? note.data : "Write Note Content here..." }}
        className="mb-4 pb-[89px] relative pt-4 h-[calc(100%-100px)] max-h-fit overflow-y-auto"
      ></div>

      {/* Footer buttons */}
      <div className="hidden xl:block bg-white dark:bg-[#0e121a] py-4 border-t dark:border-t dark:border-[#222531] xl:flex gap-3 absolute inset-x-4 bottom-0">
        <button
          onClick={() => saveNote(note._id)}
          className="py-3 px-4 bg-blue-600 text-white rounded-lg"
        >
          Save Note
        </button>
        <button className="py-3 px-4 bg-[#f4f5f9] text-gray-700 dark:bg-[#222531] dark:text-neutral-300 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SingleNote;
