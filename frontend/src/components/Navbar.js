import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../store';

const Navbar = () => {

    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout());
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary uni-padding">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ "fontSize": "25px" }}>Portfolio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!isLoggedIn && <><li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li></>}

                            {isLoggedIn && <><li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login" onClick={handleLogout}>Logout</Link>
                                </li></>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar