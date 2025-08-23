// SendRequest.jsx
import React from 'react'

const SendRequest = ({ count, onClose, onConfirm }) => {
    return (
        <div className='sendrequest_wrap container'>
            <div className="wrap">
                <div className="title">
                    아래 내용으로 {count}곳의 제휴처에 <br />
                    요청을 보내시겠습니까?
                </div>
                <div className="sub_title">
                    본 내용은 상대방 대표 이메일로 전송합니다.
                </div>

                <div className="tag">
                    [제휴고리 알림] 제휴 요청이 도착했습니다.
                    [카페 나의 우주] ↔ [성신여자대학교 공과대학 컴퓨
                    터공학과]
                    👉 학생회 이메일 | sswulinker@sungshin.ac.kr
                    👉 간단 협약서 바로가기 | https://jehugori.com
                </div>

                <div className="btns">
                    <div className="btn close" onClick={onClose}>취소</div>
                    <div className="btn" onClick={onConfirm}>확인</div>
                </div>
            </div>
        </div>
    )
}

export default SendRequest
