import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Contact = () => {

  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState({});

  const id = localStorage.getItem("userId");

  const getRequest = async () => {
    const res = await axios.get(`http://localhost:5000/portfolio/getuser/${id}`);
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getRequest().then((data) => setUserData(data.user));
  }, [id]);

  let { _id, name, email, phone, profession, address } = userData;

  const clearMessage = () => {
    setMessage("");
  }

  const postRequest = async () => {
    const res = await axios.post(`http://localhost:5000/portfolio/sendmessage/${id}`,{
      message : String(message)
    });
    const data = await res.data;
    return data;
  }

  const handleMessage = (e) => {
    e.preventDefault();
    postRequest().then((data)=>window.alert(data.message));
    clearMessage();
  }

  return (
    <>
      <div className="row justify-content-evenly uni-padding">
        <div className="col-md-3 three-side-sections">
          <div className="row justify-content-between">
            <div className="col-md-2">
              <i className="bi bi-telephone-plus-fill" style={{ "fontSize": "25px" }}></i>
            </div>
            <div className="col-md-9">
              <h6>Phone</h6>
              <h6>{phone}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-4 three-side-sections">
          <div className="row justify-content-between">
            <div className="col-md-2">
              <i class="bi bi-envelope-open-fill" style={{ "fontSize": "25px" }}></i>
            </div>
            <div className="col-md-9">
              <h6>Email</h6>
              <h6>{email}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 three-side-sections">
          <div className="row justify-content-between">
            <div className="col-md-2">
              <i class="bi bi-house-fill" style={{ "fontSize": "25px" }}></i>
            </div>
            <div className="col-md-9">
              <h6>Address</h6>
              <h6>{address}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center my-5">
        <div className="col-md-6 contact-container">
          <div className="row">
            <div className="col-md-8 contact-head">
              <h1>Get in Touch</h1>
            </div>
          </div>

          <div className="row my-4">
            <div className="col-md-12">
              <div className="row justify-content-between">
                <div className="col-md-4 col-10 three-sided-sections">
                  <h6>{name}</h6>
                </div>
                <div className="col-md-4 col-10 three-sided-sections">
                  <h6>{profession}</h6>
                </div>
                <div className="col-md-3 col-10 three-sided-sections">
                  <h6>{address}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="my-3">
                <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1" 
                  rows="3" 
                  placeholder='Message'
                  name='message'
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}  
                >
                </textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 my-2">
              <button className='btn btn-danger' onClick={clearMessage}>Reset</button>
              <button className='btn btn-primary mx-3' onClick={handleMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact