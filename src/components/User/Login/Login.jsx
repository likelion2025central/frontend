import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/img/section/logo.svg'

const Login = () => {
    return (
        <div className='Login_wrap container'>
            <div className="header">
                <Link to='/'>
                    <img src={Logo} alt="" />
                </Link>
                <div></div>
            </div>
            <div className="main">
                <h2>로그인</h2>
                <div>
                    <div>
                        <p>아이디</p>
                        <input type="text" placeholder='아이디를 입력하세요' />
                    </div>
                    <div>
                        <p>비밀번호</p>
                        <input type="password" placeholder='비밀번호를 입력하세요' />
                    </div>
                </div>
                <button>로그인</button>
            </div>
            <div className="footer">
                <Link to='/join'>회원가입</Link>
                <Link to='/join'>비밀번호 재설정</Link>
            </div>
        </div>
    )
}

export default Login