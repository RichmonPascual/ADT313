import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, createFirstname] = useState("");
  const [middlename, createMiddlename] = useState("");
  const [lastname, createLastname] = useState("");
  const [phonenumber, createPhonenumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password, confirmPassword }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;

      case 'password':
        setPassword(event.target.value);
        break;

      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = { email, password };
    setStatus('loading');
    console.log(data);

    await axios({
      method: 'post',
      url: '/admin/register',
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);
        navigate('/login');
        setStatus('idle');
      })
      .catch((e) => {
        console.log(e);
        setStatus('idle');
        // alert(e.response.data.message);
      });
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'email')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>First name:</label>
                <input
                  type='text'
                  name='first name'
                />
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label>Middle name:</label>
                <input
                  type='text'
                  name='middle name'
                />
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label>Last name:</label>
                <input
                  type='text'
                  name='Last name'
                />
              </div>
            </div> 
            <div>
              <div className='form-group'>
                <label>Phone Number:</label>
                <input
                  type='text'
                  name='phone number'
                />
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Confirm Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  ref={confirmPasswordRef}
                  onChange={(e) => handleOnChange(e, 'confirmPassword')}
                />
              </div>
              {debounceState && isFieldsDirty && confirmPassword === '' && (
                <span className='errors'>This field is required</span>
              )}
              {password !== confirmPassword && confirmPassword !== '' && (
                <span className='errors'>Passwords do not match</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password && confirmPassword) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    }
                    if (password === '') {
                      passwordRef.current.focus();
                    }
                    if (confirmPassword === '') {
                      confirmPasswordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='login-container'>
              <a href='/login'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
