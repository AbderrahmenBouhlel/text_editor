import React, {useState} from 'react'
import { nanoid } from 'nanoid'
import './notesCss/notes.css'
import Split from 'react-split'
import Editor from '../Editor'
import SideBar from '../sideBar'
import { onSnapshot ,addDoc,doc, deleteDoc, setDoc,getDoc,query,where} from 'firebase/firestore'
import {notesCollection,db} from "../../firebase"



export default function Notes(props) {
  const [notes,setNotes] = useState([])
  const [currentNoteId,setCurrentNoteId] = useState("")
  const [tempNoteText,setTempNoteText] = useState("")
  
 
  const currentNote = notes.find((note)=> note.id == currentNoteId) || notes[0]


  React.useEffect(()=>{
    if (!props.user) return ;
    const q = query(notesCollection,where('userId','==',props.user.uid))
    const unsubscribe = onSnapshot(q ,function(snapshot){
      const notesArr = snapshot.docs.map(docSnap => ({
        ...docSnap.data(),
        id:docSnap.id
      }))
      const soretdNotes = notesArr.sort((note1 , note2) => note2.updatedAt - note1.updatedAt)
      setNotes(soretdNotes)

    })
    return unsubscribe

  },[])

  React.useEffect(()=>{
    if (!currentNoteId){
      setCurrentNoteId(notes[0]?.id)
    }

  },[notes])

  // for changing the tempNoteText
  React.useEffect(()=>{
    if(currentNote){
      setTempNoteText(currentNote.body)
    }
   
  },[currentNoteId])

  // for updated the note text
  React.useEffect(()=>{
    const timeOutId =  setTimeout(()=>{
      if(currentNote && (currentNote.body !== tempNoteText)){
        updateNote(tempNoteText)
      }
      
    },500)
    return () => clearTimeout(timeOutId)
   
  },[tempNoteText])


  async function createNewNote(){
    const newNote = {
      body:"# Type your markdown note's title here",
      userId:props.user.uid,
      updatedAt:Date.now() ,
      createdAt:Date.now()
    } 
    const newNoteRef = await addDoc(notesCollection , newNote)
    setCurrentNoteId(newNoteRef.id)
  }

 

  function updateNote(text){
      const docRef = doc(db,"notes",currentNoteId)
      setDoc(
        docRef,
        { body: text, updatedAt: Date.now() }, 
        { merge: true }
      )

  }


  async function deleteNote(noteId){
   const docRef = doc(db,"notes",noteId)
   await deleteDoc(docRef)
  }
  
  function handleToogleChange(event){
    props.setDarkMood(prev => !prev)
  }

  return (
    
    <div className={'appContainer ' + (props.darkMood ? "darkMood":null)}>
      <div  className={'app ' + (props.darkMood ?  "darkMood":null)}>
      <h1 className='userSalut'>{`hello ${props.user.email.substring(0,props.user.email.indexOf('@'))}` }</h1>
      
      { notes && notes.length>0 ?
        
        <Split sizes={[30, 70]} direction="horizontal" className={"split " + (props.darkMood ? "darkMood" : null)}>
          <SideBar createNewNote={createNewNote} 
              currentNoteId={currentNoteId} 
              notes={notes} 
              setCurrentNoteId={setCurrentNoteId} 
              deleteNote={deleteNote}
              darkMood={props.darkMood}
          />
          <Editor tempNoteText={tempNoteText}  setTempNoteText={setTempNoteText} darkMood={props.darkMood}/> 
        </Split>
          
        :
        <div className={'noNotes ' + (props.darkMood ? "darkMood" : null)}>
          <p>You have no notes</p>
          <button onClick={createNewNote}>Create new note</button>
        </div>
      }

    
      
    </div>

    </div>
  
  )
}


