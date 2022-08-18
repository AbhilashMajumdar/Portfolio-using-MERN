import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {

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

    return (
        <>
            <div className="home-container">
                <div className='text-center'>
                    {
                        userData &&
                        <>
                            <h1>Welcome {userData.name}</h1>
                            <h3>Happy, To See You Back!</h3>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Home