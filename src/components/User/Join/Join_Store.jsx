import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Back from '../../../assets/img/section/button_back.svg'
import Checkoff from '../../../assets/img/section/button_checkoff.svg'
import Checkon from '../../../assets/img/section/button_checkon.svg'
import Seeon from '../../../assets/img/section/button_seeon.svg'
import Seeoff from '../../../assets/img/section/button_seeoff.svg'
import Popup from './Popup';
import axios from 'axios';

const Join_Store = () => {
    const [pop, setPop] = useState(false);
    const [full, setFull] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [passre, setPassre] = useState('');
    const [biz, setBiz] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailok, setEmailok] = useState(false);
    const [emailcode, setEmailCode] = useState('');
    const [password, setPassword] = useState('password');
    const [passwordre, setPasswordre] = useState('password');
    const [same, setSame] = useState(false)
    const baseURL = process.env.REACT_APP_API_BASE_URL

    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    const onCheck = () => {
        if (!email) {
            alert("이메일을 입력해주세요.")
            return
        }

        axios.post(`${baseURL}/email/send`, {
            "email": email,
        })
            .then((res) => {
                console.log(res.status)
                setEmailok(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onCode = () => {
        if (!emailcode) {
            alert("코드를 입력해주세요!")
            return
        }

        axios.post(`${baseURL}/email/verify`, {
            "email": email,
            "certificationCode": emailcode
        })
            .then((res) => {
                console.log(res.status)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onJoin = () => {
        if (!(name && email && phone && id && pass && passre)) {
            alert("모든 정보를 빠짐없이 기입해주세요.");
            return
        }

        const body = {
            "username": id,
            "password": pass,
            "storeName": name,
            "bizRegNo": biz,
            "phone": phone,
            "email": email
        }

        axios.post(`${baseURL}/users/signup/boss`, body)
            .then((res) => {
                if (res.status === 201) {
                    setPop(true)
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    alert("이미 존재하는 아이디입니다.")
                }
            })
    }

    const onSame = () => {
        if (!id) {
            alert("아이디를 입력해주세요.")
            return
        }

        axios.get(`${baseURL}/users/duplicate?username=${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("사용 가능한 아이디입니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    
    const changeType = () => {
        if (password === 'password') {
            setPassword('text')
        } else {
            setPassword('password')
        }
    }

    const changeTypere = () => {
        if (password === 'password') {
            setPasswordre('text')
        } else {
            setPasswordre('password')
        }
    }

    useEffect(() => {
        if (pass === passre) {
            setSame(true)
        } else {
            setSame(false)
        }
    }, [pass, passre])

    useEffect(() => {
        if (name && email && phone && id && pass && passre) {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [name, email, phone, id, pass, passre]);

    return (
        <div className='Join_Store_wrap Join_Student_wrap container'>
            <button onClick={() => { onBack() }}><img src={Back} alt="" /></button>
            <div className="main">
                <h2>사장님 계정 생성</h2>
                <div className="store">
                    <h2>상호명</h2>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='상호 명을 작성해주세요.' />
                </div>
                <div className="email">
                    <h2>사업자 등록 번호</h2>
                    <input type="text" value={biz} onChange={(e) => { setBiz(e.target.value) }} placeholder='01234567' />
                </div>
                <div className="phone">
                    <h2>대표 연락처</h2>
                    <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder='010-0000-0000' />
                </div>
                <div className="email">
                    <h2>이메일</h2>
                    <div>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='example@univ.ac.kr' />
                        <button onClick={() => { onCheck() }} className={email ? 'full' : ''}>전송</button>
                    </div>
                </div>
                {emailok &&
                    <div className="email">
                        <h2>이메일 인증</h2>
                        <div>
                            <input value={emailcode} onChange={(e) => { setEmailCode(e.target.value) }} type="text" placeholder='인증 코드를 입력하세요.' />
                            <button onClick={() => { onCode() }} className={email ? 'full' : ''}>인증</button>
                        </div>
                    </div>
                }
                <div className="userid email">
                    <h2>아이디</h2>
                    <div>
                        <input value={id} onChange={(e) => { setId(e.target.value) }} type="text" placeholder='아이디를 입력하세요' />
                        <button onClick={() => { onSame() }} className={id ? 'full' : ''}>중복확인</button>
                    </div>
                </div>
                <div className="userpass">
                    <h2>비밀번호</h2>
                    <div>
                        <input value={pass} onChange={(e) => { setPass(e.target.value) }} type={password} placeholder='8자리 이상 특수문자 포함' />
                        <button onClick={() => { changeType() }} className='img_box'><img src={password === 'password' ? Seeon : Seeoff} alt="" /></button>
                    </div>
                </div>
                <div className="userpass_re">
                    <h2>비밀번호 재확인</h2>
                    <div>
                        <input value={passre} onChange={(e) => { setPassre(e.target.value) }} type={passwordre} placeholder='8자리 이상 특수문자 포함' />
                        <div className='img_box'>
                            <img src={same ? Checkon : Checkoff} alt="" />
                            <button onClick={() => { changeTypere() }}><img src={passwordre === 'password' ? Seeon : Seeoff} alt="" /></button>
                        </div>
                    </div>
                </div>
                <button className={full ? 'full' : ''} onClick={() => { onJoin() }}>생성하기</button>
            </div>
            {pop &&
                <Popup />
            }
        </div>
    )
}

export default Join_Store