import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Back from '../../../assets/img/section/button_back.svg'
import Checkoff from '../../../assets/img/section/button_checkoff.svg'
import Checkon from '../../../assets/img/section/button_checkon.svg'
import Seeon from '../../../assets/img/section/button_seeon.svg'
import Seeoff from '../../../assets/img/section/button_seeoff.svg'
import Popup from './Popup';

const Join_Store = () => {
    const [pop, setPop] = useState(false);

    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    const onJoin = () => {
        setPop(true)
    }

    return (
        <div className='Join_Store_wrap Join_Student_wrap container'>
            <button onClick={() => { onBack() }}><img src={Back} alt="" /></button>
            <div className="main">
                <h2>사장님 계정 생성</h2>
                <div className="store">
                    <h2>상호명</h2>
                    <input type="text" placeholder='상호 명을 작성해주세요.' />
                </div>
                <div className="email">
                    <h2>사업자 등록 번호</h2>
                    <div>
                        <input type="text" placeholder='01234567' />
                        <button>인증</button>
                    </div>
                </div>
                <div className="phone">
                    <h2>대표 연락처</h2>
                    <input type="text" placeholder='010-0000-0000' />
                </div>
                <div className="email">
                    <h2>이메일</h2>
                    <div>
                        <input type="text" placeholder='example@univ.ac.kr' />
                        <button>인증</button>
                    </div>
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

export default Join_Store