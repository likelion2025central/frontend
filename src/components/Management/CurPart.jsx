import React, { useState } from 'react'
import Back from "../../assets/img/commons/arrow.svg"
import { useNavigate } from 'react-router-dom'
import UnionDetail from './UnionDetail';
import ShopDetail from './ShopDetail';

const CurPart = () => {
  const navigate = useNavigate();
  const [roll, setRoll] = useState(null); 

  const handleClick = (value) => {
    setRoll(value);
  };

  return (
    <div className='currentpartner_wrap container'>
      <div className="hd">
        <div className="b_btn" onClick={() => navigate(-1)}>
          <img src={Back} alt="" />
        </div>
        현재 확정된 제휴
      </div>

      <div className="list_wrap">
        <div className="button_nomal" onClick={() => handleClick(0)}>
          <div className="info">
            론도
            <div className="tag">010-2379-3783</div>
          </div>
          <div className="icon"></div>
        </div>
        <div className="button_nomal" onClick={() => handleClick(1)}>
          <div className="info">
            론도 
            <div className="tag">010-2379-3783</div>
          </div>
          <div className="icon"></div>
        </div>
      </div>

      {roll === 0 && <UnionDetail />}
      {roll === 1 && <ShopDetail />}
    </div>
  )
}

export default CurPart
