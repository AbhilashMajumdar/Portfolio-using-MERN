import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const history = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        profession: "",
        address: ""
    });

    const [userErr, setUserErr] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
        phoneErr: "",
        professionErr: "",
        addressErr: ""
    });

    let { name, email, password, phone, profession, address } = userData;
    let { nameErr, emailErr, passwordErr, phoneErr, professionErr, addressErr } = userErr;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const resetData = () => {
        setUserData({
            name: "",
            email: "",
            password: "",
            phone: "",
            profession: "",
            address: ""
        });
    }

    const clearError = () => {
        setUserErr({
            nameErr: "",
            emailErr: "",
            passwordErr: "",
            phoneErr: "",
            professionErr: "",
            addressErr: ""
        });
    }

    const emailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

    const validateData = () => {
        if (!name) {
            nameErr = "Name is required!"
        } else {
            nameErr = "";
        }

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

        if (!phone) {
            phoneErr = "Phone Number is required!"
        } else if (phone.length < 10 || phone.length > 10) {
            phoneErr = "Phone number must be 10 digits";
        } else {
            phoneErr = ""
        }

        if (!profession) {
            professionErr = "Profession is required!"
        } else {
            professionErr = ""
        }

        if (!address) {
            addressErr = "Address is required!"
        } else {
            addressErr = ""
        }


        if (nameErr || emailErr || passwordErr || phoneErr || professionErr || addressErr) {
            setUserErr({ nameErr, emailErr, passwordErr, phoneErr, professionErr });
            return;
        } else {
            clearError();
        }
    }

    const postRequest = async () => {
        const res = await axios.post('http://localhost:5000/portfolio/signup', {
            name: String(name),
            email: String(email),
            password: String(password),
            phone: String(phone),
            profession: String(profession),
            address: String(address)
        });
        const data = await res.data;
        return data;
    }

    const submitData = (e) => {
        e.preventDefault();
        validateData();
        postRequest().then((data) => window.alert(data.message)).then(() => history('/login'));
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-3 col-10 signup-container">
                    <div className="form-head my-3 text-center">
                        <h1>SignUp</h1>
                    </div>
                    <form action="" className='mt-4'>
                        <div className="mb-2">
                            <input type="text"
                                placeholder='Enter Name'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{nameErr}</p>
                        </div>

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

                        <div className="mb-2">
                            <input type="text"
                                placeholder='Enter Phone Number'
                                className='form-control'
                                name='phone'
                                value={phone}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{phoneErr}</p>
                        </div>

                        <div className="mb-2">
                            <input type="text"
                                placeholder='Enter Profession'
                                className='form-control'
                                name='profession'
                                value={profession}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{professionErr}</p>
                        </div>

                        <div className="mb-2">
                            <input type="text"
                                placeholder='Enter Address'
                                className='form-control'
                                name='address'
                                value={address}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <p className='text-danger'>{addressErr}</p>
                        </div>

                        <div className="text-center my-4">
                            <button className='btn btn-danger mx-3' onClick={resetData}>Reset</button>
                            <button className='btn btn-primary' onClick={submitData}>SignUp</button>
                        </div>

                        <div className='text-center'>
                            <Link to='/login' style={{ "textDecoration": "none", "color": "black" }}><h5>Already have an account?</h5></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup