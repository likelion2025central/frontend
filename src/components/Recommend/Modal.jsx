import React from 'react'

const Modal = ({ onClose }) => {
    return (
        <div className='modal_wrap container'>
            <div className="wrap">
                <div className="title">요청이 완료되었습니다.</div>

                <div className="btn" onClick={onClose}>확인</div>

            </div>
        </div>
    )
}

export default Modal
