import React, { useState } from 'react'
import Ham from '../../assets/img/commons/button_hamburger.svg'
import { Link } from 'react-router-dom';

const Nav = () => {
    const [show, setShow] = useState(false);
    const [who, setWho] = useState('학생회');

    return (
        <div className='Nav_wrap'>
            <button onClick={() => { setShow(!show) }}><img src={Ham} alt="" /></button>
            {show &&
                <div className="nav">
                    <button className='logout'>로그아웃</button>
                    <div className="line">
                        <div></div>
                    </div>
                    {who === '학생회' ? (
                        <>
                            <Link to='/'>희망 제휴 등록하기</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/'>제휴 등록하기</Link>
                        </>
                    )}
                    <Link to='/'>나의 제휴 관리하기</Link>
                </div>
            }
        </div>
    )
}

export default Nav