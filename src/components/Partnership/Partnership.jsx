import React, { useState } from 'react'
import Arrow from "../../assets/img/commons/arrow.svg"
import RequestList from './RequestList'
import ContactList from './ContactList'
import ConfirmList from './ConfirmList'

const Partnership = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = ["제휴 요청", "협의 중", "제휴 확정"];

  return (
    <div className='partnership_wrap container'>
      <div className="hd">
        <img src={Arrow} alt="" className="b_btn"  />
        <div className="title">제휴 현황 보기</div>
      </div>
      <div className="list_section">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="contents">
        {(activeIndex === 0) && <RequestList />}
        {(activeIndex === 1) && <ContactList />}
        {(activeIndex === 2) && <ConfirmList />}
      </div>


    </div>
  )
}

export default Partnership
