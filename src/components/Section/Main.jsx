import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Background from "../../assets/img/commons/background.png"
import MainLogo from "../../assets/img/commons/main_logo.png"
import Character from "../../assets/img/commons/img_character_happy.png"
import Logo from "../../assets/img/commons/nav_logo.png"

const Main = () => {
    const [roll, setRoll] = useState(1);
    const navigation = useNavigate();

    const onLogout = () =>{
        localStorage.clear()
        navigation('/')
    }

    const role = localStorage.getItem('role')

    const rollItems = [
        {
            key: "students",
            title: `캠퍼스와 지역 상권을\n 혜택으로 끈끈하게 연결하다!`,
            btn1: { text: "제휴 둘러보기", path: "/partnership/list" },
            btn2: { text: "제휴 매칭하기", path: "/partnership/match" },
        },
        {
            key: "union",
            title: `‘성신여자대학교 공과대학 컴퓨터공학과’ \n 학생회를 환영합니다!`,
            btn1: { text: "희망 제휴 등록하기", path: "/register/student" },
            btn2: { text: "나의 제휴 관리하기", path: "/management" },
        },
        {
            key: "shop",
            title: `‘파도의 숲’ \n 사장님을 환영합니다!`,
            btn1: { text: "제휴 등록하기", path: "/register/shop" },
            btn2: { text: "나의 제휴 관리하기", path: "/management" },
        },
    ];

    return (
        <div className='Main_wrap'>
            <Link to='/'>
                <img src={Logo} alt="logo" className="logo" />
            </Link>

            <img src={Background} alt="bg" className='bg' />
            <div className="main_contents">
                <div className="title text">{rollItems[roll].title}</div>

                {roll === 0 ? (
                    <img src={MainLogo} alt="main logo" />
                ) : (
                    <img src={Character} alt="character" />
                )}

                <div className="btns">
                    <Link to={`/register/${role}`} className="btn button_nomal">
                        {rollItems[roll].btn1.text}
                        <div className="icon" />
                    </Link>

                    <Link to={rollItems[roll].btn2.path} className="btn button_nomal">
                        {rollItems[roll].btn2.text}
                        <div className="icon" />
                    </Link>
                </div>

                <div className="auth_manage">
                    <div className="logout text" onClick={onLogout}>로그아웃</div>
                    <div className="exit text">회원탈퇴</div>
                </div>
            </div>
        </div>
    );
};

export default Main;