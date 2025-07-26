import noteModel from "../models/noteModel.js";

export const createNote = async (req, res) => {
  try {
    const {userId} = req.body;
    if(!userId)
      return res.json({success: false, message: 'User not logged in!'});  
    
    const {title, tags, data} = req.body;
    if(!title || !tags || !data)
      return res.json({success: false, message: 'Title, tags and text are required!'});  

    const newNote = new noteModel({title: title, tags: tags, data: data , user: userId});
    await newNote.save();

    return res.json({success: true, message: 'New Note created SUccessfully!'})

  } catch (error) {
    return res.json({success: false, message: error.message});    
  }
}

export const updateNote = async (req, res) => {
  try {
    const {id} = req.params;
    const { title, tags, data, isArchived, userId } = req.body;
    
    // Find note that we need to update
    const note = await noteModel.findOne({_id: id, user: userId });
    if(!note)
      return res.status(404).json({success: false, message: 'Note not Found or You are not Authorized!'})

    if(title !== undefined) note.title = title;
    if(tags !== undefined) note.tags = tags;
    if(data !== undefined) note.data = data;
    if(isArchived !== undefined) note.isArchived = isArchived;

    // Save the note
    const updatedNote = await note.save();

    return res.status(200).json({success: true, note: updatedNote});

  } catch (error) {
    return res.status(500).json({success: false, message: error.message}); 
  }
}

export const deleteNote = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await noteModel.deleteOne({id});
    if(result.deletedCount === 1) 
      return res.status(200).json({success: true, message: `Note deleted Successfully!`}); 
    else
      return res.status(404).json({success: false, message: 'No note found using this id.'}); 

  } catch (error) {
    return res.status(500).json({success: false, message: error.message}); 
  }
}

export const getAllNotes = async (req, res) => {
  try {
    const {userId} = req.body;
    if (!userId)
      return res.status(404).json({success: false, message: 'User not Logged In!'})
    
    const notes = await noteModel.find({ user: userId });
    
    return res.status(200).json({success: true, notes: notes});
    
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});    
  }
}

export const getSingleNote = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;
    const note = await noteModel.findOne({_id: id, user: userId});

    if(!note)
      return res.status(404).json({success: false, message: 'No Note found on this Id or youre not authorized'})

    return res.status(200).json({success: true, note})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message}); 
  }
}

export const getAllTags = async (req, res) => {
  try {
    const {userId} = req.body;
    const allTags = await noteModel.distinct('tags', {user: userId})
    if(!allTags)
      return res.status(404).json({success: false, message: 'No tags found!'});

    return res.status(200).json({success: true, allTags});

  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
}