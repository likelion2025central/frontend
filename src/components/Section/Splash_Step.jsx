import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Back from '../../assets/img/section/button_back.svg'

const Splash_Step = () => {
    
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Splash_Step_wrap Splash_wrap container'>
            <div className="header">
                <button onClick={() => onBack()}><img src={Back} alt="" /></button>
                <h2>제휴 매칭하기</h2>
                <div></div>
            </div>
            <div className="main">
                <Link to='/login'>
                    <div></div>
                    <p>로그인</p>
                    <div className="button"></div>
                </Link>
                <Link to='/join'>
                    <div></div>
                    <p>회원가입</p>
                    <div className="button"></div>
                </Link>
            </div>
            <div></div>
        </div>
    )
}

export default Splash_Step