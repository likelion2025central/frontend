import React from 'react'
import Back from "../../assets/img/commons/arrow.svg"
import { Link, useNavigate } from 'react-router-dom'

const CurPart = () => {
  const navigate = useNavigate();
  return (
    <div className='currentpartner_wrap container'>
      <div className="hd">
        <div className="b_btn"  onClick={() => navigate(-1)}>
          <img src={Back} alt="" />
        </div>
        현재 확정된 제휴
      </div>

      <div className="list_wrap">
        <div className="button_nomal">
          <div className="info">
            론도
            <div className="tag">010-2379-3783</div>
          </div>
          <div className="icon"></div>
        </div>
        <div className="button_nomal">
          <div className="info">
            론도
            <div className="tag">010-2379-3783</div>
          </div>
          <div className="icon"></div>
        </div>
      </div>
    </div>
  )
}

export default CurPart
