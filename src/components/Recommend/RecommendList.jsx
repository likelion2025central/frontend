import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import axios from 'axios'

import 'swiper/css'
import 'swiper/css/pagination'

import Logo from "../../assets/img/commons/nav_logo.png"
import Refresh from "../../assets/img/manage/refresh.svg"
import CheckOff from "../../assets/img/commons/button_check_off.svg"
import CheckOn from "../../assets/img/commons/button_check.svg"

import SendRequest from './SendRequest'
import Modal from './Modal'
import Loading from '../Management/Loading'
import Detail from './Detail'

const RecommendList = () => {
  const { id } = useParams()
  const BASE_URL = process.env.REACT_APP_API_BASE_URL

  const [partners, setPartners] = useState([])
  const [checked, setChecked] = useState([])
  const [showRequest, setShowRequest] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedPartner, setSelectedPartner] = useState(null)

  const fetchPartners = () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role").toLowerCase()
    axios.get(`${BASE_URL}/match/${role}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        console.log("추천 리스트 응답:", res.data)
        const list = res.data || []
        setPartners(list)
        setChecked(Array(list.length).fill(false))
      })
      .catch((err) => {
        console.error("추천 리스트 불러오기 실패:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPartners()
  }, [id, BASE_URL])

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
      {loading && <Loading Loading={loading} />}
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className="contents">
        <div className="title">
          제휴사 추천 리스트
          <div
            className="tag"
            onClick={fetchPartners}
            style={{ cursor: "pointer" }}
          >
            새로고침
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
                    const role = localStorage.getItem("role")?.toLowerCase()

                    return (
                      <div
                        className="box_nomal"
                        key={role === "council" ? partner.bossAssocId : partner.councilAssocId}
                        style={{ marginBottom: "16px" }}
                        onClick={() => {
                          setSelectedPartner(partner)
                          setShowModal(true)
                        }}
                      >
                        <div
                          className="checkbox"
                          onClick={() => toggleCheck(partnerIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={checked[partnerIndex] ? CheckOn : CheckOff} alt="" />
                        </div>


                        {role === "council" ? (
                          <>

                            <img src={partner.storeImg} alt={partner.storeName} />
                            <div className="info">
                              <div className="inner">
                                <div className="name">
                                  <p className='cate'>{partner.industry}</p>
                                  {partner.storeName}
                                </div>
                                <div className="tag">
                                  추천도 {(partner.suitability * 100).toFixed(0)}%
                                </div>
                              </div>
                              <div className="icon"></div>
                            </div>
                          </>
                        ) : (
                          <>

                            <div className="info shop">
                              <div className="inner">
                                <div className="name">

                                  {`${partner.targetSchool} ${partner.targetCollege} ${partner.targetDepartment}`}
                                </div>
                                <div className="tag">
                                  추천도 {(partner.suitability * 100).toFixed(0)}%
                                </div>
                              </div>
                              <div className="icon"></div>
                            </div>
                          </>
                        )}
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
          id={id}
          partners={partners
            .filter((_, idx) => checked[idx])
            .map(p => {
              const role = localStorage.getItem("role")?.toLowerCase()

              if (role === "council") {

                return {
                  id: p.bossAssocId,
                  name: p.storeName
                }
              } else {
                return {
                  id: p.councilAssocId,
                  name: `${p.targetSchool} ${p.targetCollege} ${p.targetDepartment}`
                }
              }
            })}
          onClose={() => setShowRequest(false)}
          onConfirm={() => setShowSuccess(true)}
        />
      )}


      {showSuccess && (
        <Modal onClose={() => setShowSuccess(false)} />
      )}

      {showModal && (
        <Detail
          info={selectedPartner}
          onClose={() => {
            setShowModal(false)
            setSelectedPartner(null)
          }}
        />
      )}

    </div>
  )
}

export default RecommendList
