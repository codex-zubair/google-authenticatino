import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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


  const submitForm = (event) => {
    event.preventDefault();
    const email = (event.target.email.value);
    const password = (event.target.password.value);

    console.log(email, password);


    
    setTimeout(() => {
      sendEmailVerification(authentication.currentUser)
      .then((result) => {
        // Email verification sent!

        console.log(result);
        alert("please Check your Email!")
        // ...
      })
      .catch(error => console.log('Error', error))

    }

      , 1000)
  }





 



  const onChangeValue = (event) => {

    // console.log(event.target.value);
    // console.log(event.target.value);
  }













  return (
    <div className="App" style={{ marginTop: '20px' }}>


      <form onSubmit={submitForm}>
        <input onBlur={onChangeValue} style={{ marginTop: '20px' }} type="text" name="email" id="" placeholder='Email' /> <br />
        <input onBlur={onChangeValue} style={{ marginTop: '20px', marginBottom: '20px' }} type="text" name="password" id="" placeholder='Password' />
        <br />
        <button style={{ marginBottom: '20px' }} type='Submit'>Register</button>
        
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
