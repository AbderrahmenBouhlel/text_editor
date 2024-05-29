import React, { useEffect, useRef } from "react";
import '../componentsCss/sideBarCss/sideBar.css'



export default function SideBar(props){
    const notesRef = useRef(null);
    useEffect(()=>{
        const notesElement = notesRef.current;
        const checkOverflow = () => {
            if (notesElement.scrollHeight > notesElement.clientHeight) {
                notesElement.style.overflowY = 'scroll'; // Show sidebar if there's overflow
            } else {
                notesElement.style.overflowY = 'hidden'; // hide sidebar if there's overflow
            }
        };
        checkOverflow()
        notesElement.addEventListener('resize',checkOverflow);
        return () =>{
            notesElement.removeEventListener('resize',checkOverflow)
        }

    })
    
    return (
        <div className={"sideBar " + (props.darkMood ? "darkMood" : null)}>
            <div className="sideBarHeader">
                <h1>Notes</h1>
                <button onClick={props.createNewNote}>
                    <i className="fa-solid fa-plus"></i>
                </button>
    
            </div>
            <div className="notes"  ref={notesRef}>
                {props.notes.map((note,index)=>{
                    return (
                        <div key={index} onClick={()=>props.setCurrentNoteId(note.id)} className={`title ${props.currentNoteId == note.id ? 'selected' :null}`}>
                            <p>{
                                note.body.split('\n').map((line,index) => ( 
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))[0]
                            }
                            </p>
                            <div className="trach" onClick={(e) => { e.stopPropagation()  ;props.deleteNote(note.id)}}>
                                <i className="fa-solid fa-trash"></i>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}