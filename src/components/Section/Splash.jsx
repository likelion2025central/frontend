import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/section/img_logo.png'

const Splash = () => {

    return (
        <div className='Splash_wrap container'>
            <p>
                캠퍼스와 지역 상권을<br />
                혜택으로 끈끈하게 연결하다!
            </p>
            <img src={Logo} alt="" />
            <Link to='/normal_main'>
                <div></div>
                <p>제휴 둘러보기</p>
                <div className="button"></div>
            </Link>
            <Link to='/splash_step'>
                <div></div>
                <p>제휴 매칭하기</p>
                <div className="button"></div>
            </Link>
        </div>
    )
}

export default Splash