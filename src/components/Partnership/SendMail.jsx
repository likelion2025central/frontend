import React from 'react'

const SendMail = ({ item, onSend }) => {
    if (!item) return null

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const d = new Date(dateString)
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, "0")
        const dd = String(d.getDate()).padStart(2, "0")
        return `${yyyy}.${mm}.${dd}`
    }

    return (
        <div className='sendmail_wrap '>
            <div className="wrap">
                <div className="title">
                    아래 내용으로 제휴처에 <br />
                    요청을 보내시겠습니까?
                </div>
                <div className="sub_title">
                    본 내용은 상대방 대표 이메일로 전송합니다.
                </div>

                <div className="tag">
                    [제휴고리 알림] 최종 제휴 협약서를 확인해주세요. <br />
                    [{item.storeName}] ↔ [{item.targetSchool} {item.targetCollege} {item.targetDepartment}] <br />
                    혜택 | {item.boon} <br />
                    기간 | {formatDate(item.startDate)} - {formatDate(item.endDate)} <br />
                    대상 | {item.targetSchool} {item.targetCollege} {item.targetDepartment} 재학생
                </div>

                <div className="btns">
                    <div className="btn close" onClick={() => onSend(false)}>
                        취소
                    </div>
                    <div className="btn" onClick={() => onSend(true)}>
                        확인
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMail
