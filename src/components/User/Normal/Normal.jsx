import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/img/section/logo.svg'
import Cha from '../../../assets/img/commons/img_character_happy.png'
import Down from '../../../assets/img/section/button_donw.svg'

const Normal = () => {
    const [col, setCol] = useState('');
    const [fac, setFac] = useState('');
    const [major, setMajor] = useState('');
    const [full, setFull] = useState(false)
    const navigaiton = useNavigate();

    const onDetail = () => {
        navigaiton(`/normal_detail/${col}/${fac}/${major}`)
    }

    useEffect(() => {
        if (col && fac && major) {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [col, fac, major]);


    return (
        <div className='Normal_wrap Login_wrap container'>
            <div className="header">
                <Link to='/'>
                    <img src={Logo} alt="" />
                </Link>
                <div></div>
            </div>
            <div className="main">
                <p>
                    ‘학교 / 학부 / 학과’를 입력하여<br />
                    다양한 제휴 혜택을 누려보세요!
                </p>
                <img src={Cha} alt="" />
                <div className="select_wrap">
                    <div>
                        <select value={col} onChange={(e) => setCol(e.target.value)}>
                            <option value="">OO대학교</option>
                            <option value="성신여자대학교">성신여자대학교</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                    <div>
                        <select value={fac} onChange={(e) => setFac(e.target.value)}>
                            <option value="">OO단과대학</option>
                            <option value="공과대학">공과대학</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                    <div>
                        <select value={major} onChange={(e) => setMajor(e.target.value)}>
                            <option value="">OO학과</option>
                            <option value="컴퓨터공학과">컴퓨터공학과</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                    <button className={full ? 'full' : ''} onClick={() => { onDetail() }}>둘러보기</button>
                </div>
            </div>
            <div className="footer">
                <Link to='/login'>로그인</Link>
                <Link to='/join'>회원가입</Link>
            </div>
        </div>
    )
}

export default Normal
