import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('')


  const handleEmailBlur = e => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  }

  const handlePasswordBlur = e => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  }

  const handleFormSubmit = e => {
    //prevent default behaviour
    e.preventDefault();

    //validation for react bootstrap
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    //validate password by regex at least one special character
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password should contain at least one special character');
      return;
    }
    setValidated(true);
    setError('');

    //sign in and login with email password
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error('error', error);
          setError(error.message);
        })
    } else {

      //firebase create user by email password identifier
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('');
          setPassword('');
          verifyEmail();
          setUser();
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    // console.log('form submitted', email, password);
  }

  //handler add to checkbox input field
  const handleRegisteredChange = e => {
    // console.log(e.target.checked)
    setRegistered(e.target.checked);
  }

  //email verification sent to mail
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent')
      })
  }

  //password reset email send to mail
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('password reset email has sent')
      })
  }

  //handler add to name input field
  const handleNameBlur = (e) => {
    setName(e.target.value)
  }

  //update user
  const setUser = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name updated')
    })
  }

  return (
    <div className='w-25 mx-auto mt-2'>
      <h2 className='text-primary'>Please {registered ? 'LogIn!!' : 'Register!!'}</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

        {!registered && <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label> Name</Form.Label>
          <Form.Control onBlur={handleNameBlur} type="name" placeholder="Enter your name" required />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />

          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
        </Form.Group>
        <p className='text-danger'>{error}</p>
        <Button onClick={handlePasswordReset} variant="link">Forget password?</Button>
        <br></br>
        <Button variant="primary" type="submit">
          {registered ? 'LogIn' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
