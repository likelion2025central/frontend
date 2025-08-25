import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/img/section/logo.svg'
import axios from 'axios'

const Login = () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const navigation = useNavigate();

    const onLogin = () => {
        if (!(id && pass)) {
            alert("빈칸을 모두 채워주세요!")
            return
        }

        axios.post(`${baseURL}/users/login`, {
            username: id,
            password: pass
        })
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    localStorage.setItem('token', res.data.data.token)
                    localStorage.setItem('role', res.data.data.role)
                }
            })
            .catch((err) => {
                console.error(err)
                alert("로그인 실패! 아이디/비밀번호를 확인하세요.")
            })
    }


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
                        <input value={id} onChange={(e) => { setId(e.target.value) }} type="text" placeholder='아이디를 입력하세요' />
                    </div>
                    <div>
                        <p>비밀번호</p>
                        <input value={pass} onChange={(e) => { setPass(e.target.value) }} type="password" placeholder='비밀번호를 입력하세요' />
                    </div>
                </div>
                <button className={id && pass ? 'full' : ''} onClick={() => { onLogin() }}>로그인</button>
            </div>
            <div className="footer">
                <Link to='/join'>회원가입</Link>
                <Link to='/join'>비밀번호 재설정</Link>
            </div>
        </div>
    )
}

export default Login