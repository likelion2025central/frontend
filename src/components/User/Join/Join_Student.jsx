import React, { useEffect, useState } from 'react'
import Back from '../../../assets/img/section/button_back.svg'
import Down from '../../../assets/img/section/button_donw.svg'
import Checkoff from '../../../assets/img/section/button_checkoff.svg'
import Checkon from '../../../assets/img/section/button_checkon.svg'
import Seeon from '../../../assets/img/section/button_seeon.svg'
import Seeoff from '../../../assets/img/section/button_seeoff.svg'
import { useNavigate } from 'react-router-dom'
import Popup from './Popup'
import axios from 'axios'

const Join_Student = () => {
    const [pop, setPop] = useState(false);
    const [full, setFull] = useState(false);
    const [emailok, setEmailok] = useState(false);
    const [col, setCol] = useState('');
    const [password, setPassword] = useState('password');
    const [passwordre, setPasswordre] = useState('password');
    const [same, setSame] = useState(false)
    const [fac, setFac] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [emailcode, setEmailCode] = useState('');
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [passre, setPassre] = useState('');

    const baseURL = process.env.REACT_APP_API_BASE_URL
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    const onJoin = () => {
        if (!(col && fac  && email && phone && id && pass && passre)) {
            alert("모든 정보를 빠짐없이 기입해주세요.");
            return
        }

        const body = {
            college: col,
            department: fac,
            email: email,
            password: pass,
            phone: phone,
            schoolName: major,
            username: id
        }

        axios.post(`${baseURL}/users/signup/council`, body)
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

    useEffect(() => {
        if (pass === passre) {
            setSame(true)
        } else {
            setSame(false)
        }
    }, [pass, passre])

    useEffect(() => {
        if (col && fac && major && email && phone && id && pass && passre) {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [col, fac, major, email, phone, id, pass, passre]);

    return (
        <div className='Join_Student_wrap container'>
            <button onClick={() => { onBack() }}><img src={Back} alt="" /></button>
            <div className="main">
                <h2>학생회 계정 생성</h2>
                <div className="college">
                    <h2>소속명</h2>
                    <div>
                        <div>
                            <select value={col} onChange={(e) => setCol(e.target.value)}>
                                <option value="">OO대학교</option>
                                <option value="성신여자대학교">성신여자대학교</option>
                            </select>
                            <img src={Down} alt="" />
                        </div>
                        <div>
                            <select value={fac} onChange={(e) => setFac(e.target.value)}>
                                <option value="">OO대학</option>
                                <option value="공과대학">공과대학</option>
                            </select>
                            <img src={Down} alt="" />
                        </div>
                    </div>
                    <div className='major'>
                        <select value={major} onChange={(e) => {
                            setMajor(e.target.value === "null" ? null : e.target.value)
                        }}  >
                            <option value="" disabled>OO학과</option>
                            <option value="null" >전체</option>
                            <option value="컴퓨터공학과">컴퓨터공학과</option>
                            <option value="ai융합학부">ai융합학부</option>
                            <option value="화학공학과">화학공학과</option>
                            <option value="기계공학과">기계공학과</option>
                            <option value="국어국문학과">국어국문학과</option>
                            <option value="영어영문학과">영어영문학과</option>
                            <option value="심리학과">심리학과</option>
                            <option value="경영학과">경영학과</option>
                            <option value="경제학과">경제학과</option>
                            <option value="미술학과">미술학과</option>
                            <option value="음악학과">음악학과</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
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
                <div className="phone">
                    <h2>대표 연락처</h2>
                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder='010-0000-0000' />
                </div>
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

export default Join_Student