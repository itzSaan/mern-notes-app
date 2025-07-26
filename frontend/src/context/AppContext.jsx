import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [userNotes, setUserNotes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [note, setNote] = useState();

  axios.defaults.withCredentials = true;

  // Get user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/user-data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get a SIngle note
  const getSingleNote = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + `/api/notes/note-${id}`);

      data.success ? setNote(data.note) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get user notes
  const getUserNotes = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/notes/all-notes");
      data.success ? setUserNotes(data.notes) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get user note tags
  const getNoteTags = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/notes/get-all-tags");
      data.success ? setAllTags(data.allTags) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Archive note
  const archiveNote = async (id, note) => {
    try {
      const noteToSave = { ...note, isArchived: !note.isArchived}
      const { data } = await axios.put(backendUrl + `/api/notes/${id}`, noteToSave);
      data.success ? toast.success('Note Archived Successfully!'): toast.error('Unable to archive note');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get user is Authenticated or not
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        getUserNotes();
        getNoteTags();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    allTags,
    userNotes,
    getSingleNote,
    note,
    setNote,
    archiveNote,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
