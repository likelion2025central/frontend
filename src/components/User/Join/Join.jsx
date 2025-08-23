import React from 'react'
import Logo from '../../../assets/img/section/logo.svg'
import Back from '../../../assets/img/section/button_back.svg'
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Join_wrap Splash_Step_wrap Splash_wrap container'>
            <div className="header">
                <button onClick={() => onBack()}><img src={Back} alt="" /></button>
                <h2></h2>
                <div></div>
            </div>
            <div className="main">
                <Link to='/join_student'>
                    <div></div>
                    <p>학생회로 시작하기</p>
                    <div className="button"></div>
                </Link>
                <Link to='/join_store'>
                    <div></div>
                    <p>사장님으로 시작하기</p>
                    <div className="button"></div>
                </Link>
            </div>
            <div></div>
        </div>
    )
}

export default Join