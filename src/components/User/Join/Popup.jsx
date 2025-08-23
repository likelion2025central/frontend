import React from 'react'
import { Link } from 'react-router-dom'

const Popup = () => {
    return (
        <div className="popup_wrap">
            <div className="popup">
                <p>회원가입이 완료되었습니다!</p>
                <Link to='/login'>로그인 바로가기</Link>
            </div>
        </div>
    )
}

export default Popup