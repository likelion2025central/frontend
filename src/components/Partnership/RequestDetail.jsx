import React from 'react'

const RequestDetail = ({ name, onClose }) => {
    if (!name) return null
    return (
        <div className='requestdetail_wrap container'>
            <div className="wrap">
                <img src="" alt="" />
                <div className="info">
                    <div className="name">파도의숲</div>
                    <div className="cate">010-3434-3434</div>
                </div>
                <div className="table_list">
                    <div className="table">
                        <div className="section">업종</div>
                        <p>카페</p>
                    </div>
                    <div className="table">
                        <div className="section">혜택</div>
                        <p>카페</p>
                    </div>
                    <div className="table">
                        <div className="section">기간</div>
                        <p>카페</p>
                    </div>
                    <div className="table">
                        <div className="section">제휴 희망 인원</div>
                        <p>카페</p>
                    </div>
                    <div className="table note">
                        <div className="section">특이사항</div>
                        <p>카페</p>
                    </div>

                </div>
                <div className="btn" onClick={onClose}>확인</div>
            </div>
        </div>
    )
}

export default RequestDetail
