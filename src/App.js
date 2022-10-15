import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from './Firebase/Firebase.init';
import { useState } from 'react';



function App() {


  const authentication = getAuth(app);
  const provider = new GoogleAuthProvider();


  const [user, setUser] = useState(false);



  const googleSignUp = () => {
    signInWithPopup(authentication, provider)
      .then(result => { setUser(result.user); console.log(result.user) })
      .catch(error => console.log(error));
    ;

  }

  const signOutFromGoogle = () => {
    signOut(authentication)
      .then(result => setUser({}))
      .catch(error => setUser({}))

  }


  return (
    <div className="App" style={{ marginTop: '20px' }}>

      {user.email ? <div>
        <button onClick={signOutFromGoogle}>Sing Out From Google </button>

        <h1>email: {user.email}</h1>
        <h1>User Name {user.displayName}</h1>
     

      </div> 
        :
        <button style={{ marginTop: '20px' }} onClick={googleSignUp}>Sign Up With Google </button>
      }
    </div>
  );
}

export default App;
