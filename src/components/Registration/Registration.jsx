import React, { useState } from 'react'
import Union from './Union';
import Shop from './Shop';
import Logo from "../../assets/img/commons/nav_logo.png"
import { Link } from 'react-router-dom';

const Registration = () => {
    const [roll, setRoll] = useState(1);
    return (
        <div className='registration_wrap container'>
            <Link to='/'>
                <img src={Logo} alt="logo" className="logo" />
            </Link>
           
            {(roll === 0) ?
                <Union />
                :
                <Shop />
            }


        </div>
    )
}

export default Registration
