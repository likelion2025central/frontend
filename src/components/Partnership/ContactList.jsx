import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ContactList = ({ onConfirm }) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL
  const [list, setList] = useState([])
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role").toLowerCase()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${BASE_URL}/${role}/requests/negotiating`, {
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
        setList(res.data.content || [])

      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err)
      })

  }, [BASE_URL])

  const chunkArray = (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const pages = chunkArray(list, 4)

  return (
    <div className='contactlist_wrap'>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={12}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        className='list'
      >
        {pages.map((page, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            {page.map((item, idx) => (
              <div className="button_nomal" key={idx} style={{ marginBottom: '12px' }} onClick={() => navigate(`/partnership/write/${item.associationId}`)}

              >
                <div className="wrap">
                  <div className="name">{role === "council"
                    ? `${item.storeName}`
                    : `${item.schoolName} ${item.college} ${item.department}`
                  }</div>
                  <div
                    className="btn"

                  >
                    제휴 확정하기 →
                  </div>

                </div>
                <div className="icon" ></div>
              </div>
            ))}
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  )
}

export default ContactList
