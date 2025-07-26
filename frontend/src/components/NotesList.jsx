import { useContext } from "react";
import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";


const NotesList = () => {

  const { userNotes, getSingleNote } = useContext(AppContext);
  // const navigate = useNavigate();  

  return (
    <div className="hidden xl:block p-6 bg-white dark:bg-[#0e121a] border-r dark:border-r dark:border-[#222531] h-ful w-[20rem] max-w-sm row-span-2 fixed top-[81px] left-[18rem] bottom-0">
      <button className="w-full bg-blue-600 text-white mb-3 p-3 text-center rounded-lg">+ Create New Note</button>
      <div className="flex flex-col gap-2 h-full overflow-y-auto">

        {userNotes.map((note, i) => (
          <div onClick={() => getSingleNote(note._id)} key={i} className="p-3 bg-[#f4f5f9] dark:bg-[#222531] dark:text-neutral-300 rounded-lg flex flex-col gap-2 cursor-pointer">
          <h4 className="text-lg font-bold dark:font-medium">{note.title}</h4>
          <div className="tags">
            {note.tags.map((tag, i) => <span key={i} className="bg-[#dde0e7] dark:bg-[#545965] py-1 px-2 rounded text-xs mr-2">{
              tag.charAt(0).toUpperCase() + tag.slice(1)
            }</span>)}
            
          </div>
          <span className="date text-sm font-medium text-gray-500">{note.date.slice(0, 10)}</span>
        </div>
        ))}

        
      </div>
    </div>
  )
}

export default NotesList