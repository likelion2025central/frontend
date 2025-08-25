import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Arrow from "../../assets/img/commons/arrow.svg"
import RequestList from './RequestList'
import ContactList from './ContactList'
import ConfirmList from './ConfirmList'

const Partnership = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(location.state?.activeIndex || 0)
  const write = location.state?.write || false 
  const { id } = useParams()  

  const [confirmId, setConfirmId] = useState(id || null) 

  const tabs = ["제휴 요청", "협의 중", "제휴 확정"]

  useEffect(() => {
    if (id) {
      setActiveIndex(2)  
      setConfirmId(id)  
    }
  }, [id])

  const handleTabClick = (index) => {
    setActiveIndex(index)


    if (index === 2) {
      setConfirmId(null)
      navigate("/partnership")  
    }
  }

  return (
    <div className='partnership_wrap container'>
      <div className="hd">
        <img src={Arrow} alt="" className="b_btn" />
        <div className="title">제휴 현황 보기</div>
      </div>

      <div className="list_section">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)} 
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="contents">
        {activeIndex === 0 && <RequestList />}
        {activeIndex === 1 && <ContactList />}
        {activeIndex === 2 && <ConfirmList writeId={confirmId} />}
      </div>
    </div>
  )
}

export default Partnership
