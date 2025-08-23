import React, { useState } from 'react'
import Back from '../../../assets/img/section/button_back.svg'
import Down from '../../../assets/img/section/button_donw.svg'
import Checkoff from '../../../assets/img/section/button_checkoff.svg'
import Checkon from '../../../assets/img/section/button_checkon.svg'
import Seeon from '../../../assets/img/section/button_seeon.svg'
import Seeoff from '../../../assets/img/section/button_seeoff.svg'
import { useNavigate } from 'react-router-dom'
import Popup from './Popup'

const Join_Student = () => {
    const [pop, setPop] = useState(false);
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    const onJoin = () => {
        setPop(true)
    }

    return (
        <div className='Join_Student_wrap container'>
            <button onClick={() => { onBack() }}><img src={Back} alt="" /></button>
            <div className="main">
                <h2>학생회 계정 생성</h2>
                <div className="college">
                    <h2>소속명</h2>
                    <div>
                        <div>
                            <select>
                                <option value="">OO대학교</option>
                            </select>
                            <img src={Down} alt="" />
                        </div>
                        <div>
                            <select>
                                <option value="">OO대학</option>
                            </select>
                            <img src={Down} alt="" />
                        </div>
                    </div>
                    <div className='major'>
                        <select>
                            <option value="">OO학과</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className="email">
                    <h2>이메일</h2>
                    <div>
                        <input type="text" placeholder='example@univ.ac.kr' />
                        <button>인증</button>
                    </div>
                </div>
                <div className="phone">
                    <h2>대표 연락처</h2>
                    <input type="text" placeholder='010-0000-0000' />
                </div>
                <div className="userid">
                    <h2>아이디</h2>
                    <input type="text" placeholder='010-0000-0000' />
                </div>
                <div className="userpass">
                    <h2>비밀번호</h2>
                    <div>
                        <input type="password" placeholder='8자리 이상 특수문자 포함' />
                        <button className='img_box'><img src={Seeon} alt="" /></button>
                    </div>
                </div>
                <div className="userpass_re">
                    <h2>비밀번호 재확인</h2>
                    <div>
                        <input type="password" placeholder='8자리 이상 특수문자 포함' />
                        <div className='img_box'>
                            <img src={Checkoff} alt="" />
                            <button><img src={Seeoff} alt="" /></button>
                        </div>
                    </div>
                </div>
                <button onClick={() => { onJoin() }}>생성하기</button>
            </div>

            {pop &&
                <Popup />
            }
        </div>
    )
}

export default Join_Student