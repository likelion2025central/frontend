import React from 'react'

const Detail = ({ info, onClose }) => {
  if (!info) return null

  return (
    <div className="detail_wrap">
      <div className="wrap">
        <p className="text">
          {info.storeName
            ? `${info.storeName} (${info.industry})`
            : `${info.targetSchool} ${info.targetCollege} ${info.targetDepartment}`}
          <br />
        </p>

        <div className="table_list">
          <div className="table">
            <div className="section">업종</div>
            <p>{info.industry || "-"}</p>
          </div>

          <div className="table">
            <div className="section">혜택</div>
            <p>{info.boon || "-"}</p>
          </div>

          <div className="table">
            <div className="section">기간</div>
            <p>{info.period || "정보 없음"}</p>
          </div>

          <div className="table">
            <div className="section">제휴 희망 인원</div>
            <p>{info.num ? `${info.num}명 이상` : "-"}</p>
          </div>

          <div className="table">
            <div className="section">대상</div>
            <p>
              {info.targetSchool} {info.targetCollege} {info.targetDepartment}
            </p>
          </div>

          <div className="table note">
            <div className="section">특이사항</div>
            <p>{info.significant || "없음"}</p>
          </div>
        </div>

        <div className="btns">
          <div className="btn" onClick={onClose}>닫기</div>
        </div>
      </div>
    </div>
  )
}

export default Detail
