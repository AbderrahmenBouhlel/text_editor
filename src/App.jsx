import React, {useEffect, useState} from 'react'
import './componentsCss/generalCss/general.css'
import './app.css'
import Notes from './components/notes/notes'
import { BrowserRouter as Router , Switch,Route , Redirect ,useHistory,Link} from 'react-router-dom/cjs/react-router-dom.min'
import AuthForm from './components/LoginForm/Auth'
import { onAuthStateChanged ,signOut} from 'firebase/auth'
import { use } from 'marked'
import { auth  } from './firebase'
import { MdEventNote } from "react-icons/md";


function App() {
  const [darkMood , setDarkMood] = useState(false)
  const [user , setUser] = useState(null);
  const history = useHistory()
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (user)=>{
      setUser(user)
    })
    return unsubscribe
  } ,[]);
  async function handleLogout(){
    try{
      await signOut(auth);
      history.push('/');
    }catch(error){
      console.error('Eroor signing out:',error.message)
    }
  }
  
  return (
    <Router>
      <nav className='navBar'>
        <div className='logo'> 
          <MdEventNote className='image' /> 
          <p>NoteHub</p>
        </div>
        <div className='options'>
          {user ? (
            <div className='logout' onClick={handleLogout}>Logout</div>
          ) : (
            <>
              <Link className="link" to="/auth">SignUp/Login</Link>
             
            </>
          )}
        </div>
       
    </nav>
      <Switch>
        <Route exact path="/">
        {user ? <Notes darkMood={darkMood} setDarkMood={setDarkMood} user={user} /> : <Redirect to="/auth" />}
        </Route>

        <Route exact path="/auth">
          <AuthForm user={user}/>
        </Route>
      </Switch>

      <div id="buttonContainer" className="buttonContainer" >
        <input defaultChecked onChange={()=> setDarkMood(prev => !prev)} type="checkBox" name="toogleMood" id="toogleMood" />

        <label htmlFor="toogleMood"  className={"toggleLabel "+ (darkMood ? "darkMood": "lightMood")}>

          <svg className={"sunSvg " + (darkMood ? "darkMood": "lightMood")} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="#1C274C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="#1C274C"/>
          </svg>

          <svg className={"moonSvg " + (darkMood ? "darkMood": "lightMood")} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="#1C274C"/>
          </svg>

        </label>

      </div>
      
    </Router>
    

  )
}

export default App
