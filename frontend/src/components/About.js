import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import mypic from '../images/pic.jpg';

const About = () => {

    const [userData, setUserData] = useState({});

    const id = localStorage.getItem("userId");

    const getRequest = async () => {
        const res = await axios.get(`http://localhost:5000/portfolio/getuser/${id}`);
        const data = await res.data;
        return data;
    }

    useEffect(()=>{
        getRequest().then((data)=>setUserData(data.user));
    }, [id]);

    const img = "https://www.pngkey.com/png/detail/115-1150065_black-avatar-png-graphic-transparent-library-male-symbol.png";

    let {_id, name, email, phone, profession, address} = userData;

  return (
    <>
       <div className="row justify-content-center">
            <div className="col-md-6 about-container col-10">
                <div className="row">
                    <div className="col-md-3 text-center">
                        {
                            userData.name === "Abhilash Majumdar" ?
                            <img src={mypic} alt="my image" style={{"height":"150px"}}/> :
                            <img src={img} alt="image" style={{"height": "120px"}}/>
                        }
                    </div>
                    <div className="col-md-6 mt-4 text-center">
                        <h2>{name}</h2>
                        <h4>{profession}</h4>
                    </div>
                    <div className="col-md-3 mt-5 text-center">
                        <Link to={`/edituser/${id}`}><button className='btn btn-primary'>Edit Profile</button></Link>
                    </div>
                </div>

                <div className="row mt-5 justify-content-between">
                    <div className="col-md-4">
                        <h3>Work Link</h3>

                        <a href='https://www.facebook.com/' target='_blank' style={{"textDecoration":"none", "color":"black"}}><i className="bi bi-facebook" target="_blank"><span className='mx-2'>Facebook</span></i></a> <br />

                        <a href='https://github.com/AbhilashMajumdar' target='_blank' style={{"textDecoration":"none", "color":"black"}}><i className="bi bi-github" target="_blank"><span className='mx-2'>Github</span></i></a> <br />

                        <a href='https://www.linkedin.com/in/abhilash-majumdar-b20b0112a/' target='_blank' style={{"textDecoration":"none", "color":"black"}}><i className="bi bi-linkedin" target="_blank"><span className='mx-2'>Linkedin</span></i></a>

                        <h3 className='mt-4'>Skills</h3>
                        <i className="bi bi-file-earmark-code-fill"><span className='mx-2'>MERN Dev</span> </i><br />

                        <i className="bi bi-file-diff-fill"><span className='mx-2'>Software Engineer</span></i> <br />

                        <i className="bi bi-file-code-fill"><span className='mx-2'>Web Developer</span></i> 
                    </div>

                    <div className="col-md-8 about-section">
                        <div className='text-center'>
                            <h3>About</h3>
                        </div>
                        <hr />
                        <h5>User Id - {_id}</h5>
                        <h5>Name - {name}</h5>
                        <h5>Email - {email}</h5>
                        <h5>Phone - {phone}</h5>
                        <h5>Profession - {profession}</h5>
                        <h5>Address - {address}</h5>
                    </div>
                </div>
            </div>
       </div>
    </>
  )
}

export default About