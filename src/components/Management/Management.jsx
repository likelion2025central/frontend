import React from 'react'
import { Link } from 'react-router-dom';
import Background from "../../assets/img/commons/background.png"
import Logo from "../../assets/img/commons/nav_logo.png"
import Bubble from "../../assets/img/manage/bubble.svg"

const Management = () => {
    return (
        <div className='management_wrap '>
            <Link to='/'>
                <img src={Logo} alt="logo" className="logo" />
            </Link>

            <img src={Background} alt="bg" className='bg' />

            <div className="title">나의 제휴 관리하기</div>


            <div className="btns">
                <Link to="/management/regpart" className="button_nomal">
                    등록한 제휴 관리하기
                    <div className="icon" />
                    <img src={Bubble} alt="" className='bubble' /></Link>
                <Link to="/partnership" className="button_nomal">
                    제휴 현황 보기
                    <div className="icon" /></Link>
            </div>

        </div>
    )
}

export default Management
