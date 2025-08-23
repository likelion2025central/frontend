import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import Logo from "../../assets/img/commons/nav_logo.png"
import Refresh from "../../assets/img/manage/refresh.svg"
import Exam from "../../assets/img/manage/exam.png"
import CheckOff from "../../assets/img/commons/button_check_off.svg"
import CheckOn from "../../assets/img/commons/button_check.svg"

import SendRequest from './SendRequest'
import Modal from './Modal'  
const RecommendList = () => {
  const partners = [
    { cate: "카페", name: "론도", rate: "100%" },
    { cate: "식당", name: "백반집", rate: "90%" },
    { cate: "편의점", name: "CU", rate: "80%" },
    { cate: "서점", name: "알라딘", rate: "95%" },
    { cate: "카페", name: "스타벅스", rate: "85%" },
    { cate: "분식", name: "김밥천국", rate: "70%" }
  ]

  const [checked, setChecked] = useState(Array(partners.length).fill(false))
  const [showRequest, setShowRequest] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const toggleCheck = (index) => {
    setChecked((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]
      return newState
    })
  }

  const pages = []
  for (let i = 0; i < partners.length; i += 3) {
    pages.push(partners.slice(i, i + 3))
  }

  const handleRequest = () => {
    const count = checked.filter(Boolean).length
    if (count > 0) {
      setShowRequest(true)
    } else {
      alert("제휴사를 하나 이상 선택해주세요.")
    }
  }

  return (
    <div className='recommendlist_wrap container'>
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className="contents">
        <div className="title">
          제휴사 추천 리스트
          <div className="tag">새로고침
            <img src={Refresh} alt="" />
          </div>
        </div>

        <div className="list_wrap">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {pages.map((page, pageIndex) => (
              <SwiperSlide key={pageIndex}>
                <div className="slide_inner">
                  {page.map((partner, idx) => {
                    const partnerIndex = pageIndex * 3 + idx
                    return (
                      <div className="box_nomal" key={partnerIndex} style={{ marginBottom: "16px" }}>
                        <div
                          className="checkbox"
                          onClick={() => toggleCheck(partnerIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={checked[partnerIndex] ? CheckOn : CheckOff} alt="" />
                        </div>
                        <img src={Exam} alt="" />
                        <div className="info">
                          <div className="inner">
                            <div className="name">
                              <p className='cate'>{partner.cate}</p>
                              {partner.name}
                            </div>
                            <div className="tag">
                              추천도 {partner.rate}
                            </div>
                          </div>
                          <div className="icon"></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="button_nomal" onClick={handleRequest}>
        제휴 요청하기
      </div>

      {showRequest && (
        <SendRequest
          count={checked.filter(Boolean).length}
          onClose={() => setShowRequest(false)}
          onConfirm={() => {
            setShowRequest(false)
            setShowSuccess(true) 
          }}
        />
      )}

      {showSuccess && (
        <Modal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  )
}

export default RecommendList
