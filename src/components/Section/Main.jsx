import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Background from "../../assets/img/commons/background.png"
import MainLogo from "../../assets/img/commons/main_logo.png"
import Character from "../../assets/img/commons/img_character_happy.png"
import Logo from "../../assets/img/commons/nav_logo.png"

const Main = () => {
    const [roll, setRoll] = useState(0);
    const rollItems = [
        {
            key: "students",
            title: `캠퍼스와 지역 상권을\n 혜택으로 끈끈하게 연결하다!`,
            btn1: "제휴 둘러보기",
            btn2: "제휴 매칭하기"
        },
        {
            key: "union",
            title: `‘성신여자대학교 공과대학 컴퓨터공학과’ \n 학생회를 환영합니다!`,
            btn1: "희망 제휴 등록하기",
            btn2: "나의 제휴 관리하기"
        },
        {
            key: "shop",
            title: `‘파도의 숲’ \n 사장님을 환영합니다!`,
            btn1: "제휴 등록하기",
            btn2: "나의 제휴 관리하기"
        },
    ]
    //roll이 0 -> 일반학생, 1 -> 학생회, 2-> 상점
    return (
        <div className='Main_wrap'>
            <Link to='/'>  <img src={Logo} alt="" className="logo" /> </Link>

            <img src={Background} alt="bg" className='bg' />
            <div className="main_contents">
                <div className="title text">{rollItems[roll].title}</div>

                {(roll === 0) ?
                    <img src={MainLogo} alt="" />
                    :
                    <img src={Character} alt="" />}

                <div className="btns">
                    <div className="btn1 button_nomal">
                        {rollItems[roll].btn1}
                        <div className="icon"/>
                    </div>
                    <div className="btn2 button_nomal">
                        {rollItems[roll].btn2}
                        <div className="icon" />
                    </div>
                </div>

                <div className="auth_manage">
                    <div className="logout text">로그아웃</div>
                    <div className="exit text">회원탈퇴</div>
                </div>
            </div>

        </div>
    )
}

export default Main