import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/pagination'

import Back from "../../assets/img/commons/arrow.svg"
import CheckOff from "../../assets/img/commons/button_check_off.svg"
import CheckOn from "../../assets/img/commons/button_check.svg"
import ManageDetail from './ManageDetail'

const RegPart = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")?.toLowerCase()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE_URL}/${role}/association`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 0,
        size: 100,
      },
    })
      .then((res) => {
        console.log("서버 응답:", res.data)
        setItems(res.data?.data?.content || [])
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err)
      })
      .finally(() => {
        setLoading(false) 
      })
  }, [BASE_URL, role, token])

  const pages = []
  for (let i = 0; i < items.length; i += 3) {
    pages.push(items.slice(i, i + 3))
  }

  return (
    <div className="regpart_wrap container">
      <div className="hd">
        <div className="b_btn" onClick={() => navigate(-1)}>
          <img src={Back} alt="" />
        </div>
        등록한 제휴 관리하기
      </div>

      {loading ? (
        <div className="loading">불러오는 중...</div>
      ) : (
        <>
          <div className="list_wrap">
            {items.length === 0 ? (
              <div className="empty">등록된 제휴가 없습니다.</div>
            ) : (
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{ el: '.swiper-pagination', clickable: true }}
              >
                {pages.map((pageItems, pageIndex) => (
                  <SwiperSlide key={pageIndex}>
                    <div className="slide_inner">
                      {pageItems.map((item, i) => {
                        const itemIndex = pageIndex * 3 + i
                        return (
                          <div
                            className="item"
                            key={item.id || i}
                            style={{ marginBottom: "16px", marginRight: "5px" }}
                          >
                            <div
                              className="checkbox"
                              onClick={() => setSelectedIndex(itemIndex)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={selectedIndex === itemIndex ? CheckOn : CheckOff}
                                alt=""
                              />
                            </div>
                            <div className="wrap">
                              <div className="list">
                                <div className="list_item">{item.industry}</div>
                                <div className="list_item">{item.boon}</div>
                                <div className="list_item">{item.period}</div>
                                <div className="list_item">{item.num}명 이상</div>
                                <div className="list_item">
                                  {item.targetSchool} {item.targetCollege} {item.targetDepartment}
                                </div>
                                <div className="list_item">{item.significant}</div>
                              </div>
                              <div className="line"></div>
                              <div className="btns">
                                <div
                                  className="btn"
                                  onClick={() => { setSelectedItem(item); setShowDetail(true) }}
                                >
                                  희망 제휴 조건 상세보기 →
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination"></div>
              </Swiper>
            )}
          </div>

          <div
            className="button_nomal"
            onClick={() => {
              if (selectedIndex !== null) {
                const selectedItem = items[selectedIndex]
                if (selectedItem?.id) {
                  navigate(`/recommendlist/${selectedItem.id}`)
                } else {
                  alert("선택된 제휴의 id가 없습니다.")
                }
              } else {
                alert("체크박스를 선택해주세요!")
              }
            }}
          >
            AI 매칭하기
          </div>
        </>
      )}

      {showDetail && (
        <ManageDetail item={selectedItem} onClose={() => setShowDetail(false)} />
      )}
    </div>
  )
}

export default RegPart
