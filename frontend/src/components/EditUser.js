import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = () => {

    const history = useNavigate();

    const id = useParams().id;

    const handleCancel = () => {
        history('/about');
    }

    const [userData, setUserData] = useState({});

    const [userErr, setUserErr] = useState({
        nameErr: "",
        emailErr: "",
        phoneErr: "",
        professionErr: "",
        addressErr: ""
    });

    const getRequest = async () => {
        const res = await axios.get(`http://localhost:5000/portfolio/getuser/${id}`);
        const data = await res.data;
        console.log(data);
        let { name, email, phone, profession, address } = data.user;
        setUserData({ name, email, phone, profession, address });
    }

    useEffect(() => {
        getRequest()
    }, []);

    let { name, email, phone, profession, address } = userData;
    let { nameErr, emailErr, phoneErr, professionErr, addressErr } = userErr;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const clearError = () => {
        setUserErr({
            nameErr: "",
            emailErr: "",
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

        if (nameErr || emailErr || phoneErr || professionErr || addressErr) {
            setUserErr({ nameErr, emailErr, phoneErr, professionErr, addressErr });
            return;
        } else {
            clearError();
        }
    }

    const putRequest = async () => {
        const res = await axios.put(`http://localhost:5000/portfolio/edituser/${id}`, {
            name: String(name),
            email: String(email),
            phone: String(phone),
            profession: String(profession),
            address : String(address)
        });
        const data = await res.data;
        return data;
    }

    const saveData = (e) => {
        e.preventDefault();
        validateData();
        putRequest().then((data) => window.alert(data.message)).then(() => history('/about'));
    }


    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-3 col-10 edit-container">
                    <div className="form-head my-4 text-center">
                        <h1>Edit Profile</h1>
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
                            <button className='btn btn-danger mx-3' onClick={handleCancel}>Cancel</button>
                            <button className='btn btn-primary' onClick={saveData}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser