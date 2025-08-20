import React, { useState } from 'react'
import Back from "../../assets/img/commons/arrow.svg"
import { useNavigate } from 'react-router-dom'

const EditDocx = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    return (
        <div className='editdocx_wrap container'>
            <div className="hd">
                <div className="b_btn" onClick={() => navigate(-1)}>
                    <img src={Back} alt="" />
                </div>
                조건 수정
            </div>
            <div className="content">
                등록 부분 들고 와서 사용
                <div className="button_nomal" onClick={() => setModal(true)}>
                    수정하기
                </div>

            </div>
            {modal &&
                <div className="modal" >
                    <div className="wrap">
                        <p className='text'>조건 수정 사항을 저장하시겠습니까?</p>
                        <div className="btns">
                            <div className="btn" onClick={() => setModal(false)}>취소</div>
                            <div className="btn">확인</div>
                        </div>
                    </div>
                </div>

            }


        </div>
    )
}

export default EditDocx
