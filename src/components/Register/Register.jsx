import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from '../../assets/img/section/logo.svg'
import Registser_Student from './Registser_Student'
import Register_Store from './Register_Store'

const Register = () => {
    const params = useParams();
    const role = localStorage.getItem('role')

    return (
        <div className='Register_wrap container Join_Student_wrap Login_wrap'>
            <div className="header">
                <Link to='/main'>
                    <img src={Logo} alt="" />
                </Link>
                <div></div>
            </div>
            {role === 'student' ? (
                <Registser_Student />
            ) : (
                <Register_Store />
            )}
        </div>
    )
}

export default Register