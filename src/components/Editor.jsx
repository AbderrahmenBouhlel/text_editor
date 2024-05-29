import React, { useEffect } from "react";
import '../componentsCss/editorCss/editor.css'
import Showdown from "showdown";

export default function Editor(props){
    const textAreaRef = React.useRef(null);
    const [selectedText, setSelectedText] = React.useState('');
    const [htmlOutput , sethtmlOutput] = React.useState('')
    const [previwMode , setPreviwMode] = React.useState(false)

    
    React.useEffect(() => {
        if (textAreaRef.current ) {
            textAreaRef.current.value = props.tempNoteText;
        }
    }, [props.tempNoteText]);
    
    
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  
    const preview =() =>{
        setPreviwMode(true)
        const html = converter.makeHtml(props.tempNoteText);
        sethtmlOutput(html)
    }
   
    const handleMouseDown = () => {
        setSelectedText('')
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseUp = () => {
        const selection = window.getSelection();
        const textS = selection.toString();
        setSelectedText(textS)
        document.removeEventListener('mouseup', handleMouseUp);
    };
    function handleChoice(e){
        const button = e.target.closest('button')
        const textarea = document.querySelector('.textarea')
        const selectionStart = e.target.selectionStart; // Get cursor position
        console.log(selectionStart)
        if (selectedText != "" && previwMode == false){
            let id = button.id
            if ( ['bold','italic','strikethrough','heading','link','quote','code','ul','ol','cl'].includes(id)){
                let newText
                let prevText = textarea.value
                const selectedIndexDebut = prevText.indexOf(selectedText)
                const selectedIndexFin = selectedIndexDebut + selectedText.length
                switch (id){
                    case 'bold':
                        newText = `**${selectedText}**`
                        break;
                    case 'italic':
                        newText = `*${selectedText}*`
                        break;
                    case 'strikethrough':
                        newText = `~~${selectedText}~~`
                        break;
                    case 'heading':
                        newText = `### ${selectedText}`
                        break;
                    case 'link':
                        newText = `[${selectedText}](url)`
                        break;
                    case 'quote':
                        newText = `\n\n> ${selectedText}`
                        break;
                    case 'code':
                        newText = `\`${selectedText}\``
                        break;
                    case 'ul':
                        if (selectedIndexDebut == 0 || props.currentNote.body[selectedIndexDebut-1] == '\n'){
                            newText = `* ${selectedText}` 
                        }
                        else{
                            newText = `\n* ${selectedText}`
                        }
                        
                        break;
                    case 'ol':
                        if (selectedIndexDebut == 0 || props.currentNote.body[selectedIndexDebut-1] == '\n'){
                            newText = `1. ${selectedText}` 
                        }
                        else{
                            newText = `\n1. ${selectedText}`
                        }
                        
                        break;
                    case 'cl':
                        if (selectedIndexDebut == 0 || props.currentNote.body[selectedIndexDebut-1] == '\n'){
                            newText = `- [ ] ${selectedText}` 
                        }
                        else{
                            newText = `\n- [ ] ${selectedText}`
                        }
                        
                        break;


                }
                const lateText = prevText.substring(0,selectedIndexDebut) +newText + prevText.substring(selectedIndexFin,prevText.length)
                
                props.setTempNoteText(lateText)

            }
           
        }
        
    }


    const handleOnChange = (e) => {
        const newText = e.target.value;
         // Update cursorPosition state
        props.setTempNoteText(e.target.value);
        textAreaRef.value = e.target.value;
      };
    
    return (
        <div className={"editor " + (props.darkMood ? "darkMood" : null)}>
            <div className="editorOptions">
                <button onClick={()=>preview()} className={`toggle ${ previwMode ? "active":null}`}>preview</button>
                <button onClick={()=> setPreviwMode(false)} className={`toggle ${ previwMode ? null:'active'}`}>write</button>

                <div className="optionGroup">
                    <button className="heading" id="heading" onClick={handleChoice}>
                        <i className="fa-solid fa-heading"></i>
                    </button>
                    <button className="bold" id="bold" onClick={handleChoice}>
                        <i className="fa-solid fa-bold"></i>
                    </button>
                    <button className="italic" id="italic" onClick={handleChoice}>
                        <i className="fa-solid fa-italic"></i>
                    </button>
                    <button className="strikethrough" id="strikethrough" onClick={handleChoice}>
                        <i className="fa-solid fa-strikethrough"></i>
                    </button>
                </div>


                <div className="optionGroup" >
                    <button className="link" id="link" onClick={handleChoice}>
                        <i className="fa-solid fa-link"></i>
                    </button>

                    <button className="quote" id="quote" onClick={handleChoice}>
                        <i className="fa-solid fa-quote-right"></i>
                    </button>

                    <button className="code" id="code" onClick={handleChoice}>
                        <i className="fa-solid fa-code"></i>
                    </button>
                </div>

                <div className="optionGroup" >
                    <button className="ul" id="ul" onClick={handleChoice}>
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                    <button className="ol" id="ol" onClick={handleChoice}>
                    <i className="fa-solid fa-list-ol"></i>
                    </button>
                    <button className="cl" id="cl" onClick={handleChoice}>
                        <i className="fa-solid fa-list-check"></i>
                    </button>
                </div>

                

            </div>

            { previwMode ?
             <div className="textarea" dangerouslySetInnerHTML={{ __html: htmlOutput }} />:


             <textarea 
                ref={textAreaRef}
                onMouseDown={handleMouseDown} 
                onChange={handleOnChange}
                className="textarea"
                defaultValue={ props.tempNoteText}
                />
            }
             

        </div>
        
    );
}