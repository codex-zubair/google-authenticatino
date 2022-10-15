import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";
import { app } from './Firebase/Firebase.init';
import { useState } from 'react';



function App() {


  const authentication = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();


  const [user, setUser] = useState(false);



  const googleSignUp = () => {
    signInWithPopup(authentication, googleProvider)
      .then(result => { setUser(result.user); console.log(result.user) })
      .catch(error => console.log(error));
  }


  const gitHubSignUp = () => {
    signInWithPopup(authentication, gitHubProvider)
      .then(result => { setUser(result.user); console.log(result) })
      .catch(error => console.log(error));
  }


  const signOutFromGoogle = () => {
    signOut(authentication)
      .then(result => setUser({}))
      .catch(error => setUser({}))

  }


  const submitForm = (event)=> 
  {
    event.preventDefault();
    console.log(event.target);
  }


  const onChangeValue = (event)=>
  {
    console.log(event.target.value);
    console.log(event.target.value);
  }


  return (
    <div className="App" style={{ marginTop: '20px' }}>


      <form>
        <input onChange ={onChangeValue} style={{ marginTop: '20px' }} type="text" name="email" id="" placeholder='Email'/> <br />
        <input onChange ={onChangeValue}   style={{ marginTop: '20px' , marginBottom: '20px'}} type="text" name="password" id="" placeholder='Password'/>
        <br />
        <button onClick={submitForm} style={{marginBottom:'20px'}} type='Submit'>Submit</button>
      </form>


      {user.uid
        ? <div>
          <button onClick={signOutFromGoogle}>Sing Out From Google </button>

          <h1>email: {user.uid
          }</h1>
          <h1>User Name {user.displayName}</h1>


        </div>
        :
        <>
          <button onClick={gitHubSignUp}>Sign Up Using Github</button> <br />
          <button style={{ marginTop: '20px' }} onClick={googleSignUp}>Sign Up With Google </button>
        </>
      }
    </div>
  );
}

export default App;
