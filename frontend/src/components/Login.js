import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store';

const Login = () => {

    const history = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [userErr, setUserErr] = useState({
        emailErr: "",
        passwordErr: "",
    });

    let { email, password } = userData;
    let { emailErr, passwordErr } = userErr;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const resetData = () => {
        setUserData({
            email: "",
            password: ""
        });
    }

    const clearError = () => {
        setUserErr({
            emailErr: "",
            passwordErr: ""
        });
    }

    const emailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

    const validateData = () => {
        if (!email) {
            emailErr = "Email is required"
        } else if (!email.match(emailRegex)) {
            emailErr = "Not a valid email!"
        } else {
            emailErr = ""
        }

        if (!password) {
            passwordErr = "Password is required"
        } else if (password.length < 6) {
            passwordErr = "Password must be atleast 6 digits!"
        } else {
            passwordErr = ""
        }

        if (emailErr || passwordErr) {
            setUserErr({ emailErr, passwordErr });
            return;
        } else {
            clearError();
        }
    }

    const postRequest = async () => {
        const res = await axios.post('http://localhost:5000/portfolio/login', {
            email : String(email),
            password : String(password),
        });
        const data = await res.data;
        console.log(data);
        return data;
    }

    const submitData = (e) => {
        e.preventDefault();
        validateData();
        postRequest().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login())).then(()=>history('/home'));
    }

  return (
    <>
            <div className="row justify-content-center">
                <div className="col-md-3 col-10 login-container">
                    <div className="form-head my-4 text-center">
                        <h1>LogIn</h1>
                    </div>
                    <form action="" className='mt-4'>
                        <div className="mb-2">
                            <input type="text"
                                placeholder='Enter Email'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{emailErr}</p>
                        </div>

                        <div className="mb-2">
                            <input type="password"
                                placeholder='Enter Password'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{passwordErr}</p>
                        </div>

                        <div className="text-center my-4">
                            <button className='btn btn-danger mx-3' onClick={resetData}>Reset</button>
                            <button className='btn btn-primary' onClick={submitData}>LogIn</button>
                        </div>

                        <div className='text-center'>
                            <Link to='/signup' style={{"textDecoration":"none", "color":"black"}}><h5>Create an account?</h5></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}

export default Login