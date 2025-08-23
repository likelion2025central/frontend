import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const ContactList = () => {

  const list = ["파도의 숲", "푸른 하늘", "초록 바람", "푸른 바다"]

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
            {page.map((name, idx) => (
              <div className="button_nomal" key={idx} style={{ marginBottom: '12px' }}>
                <div className="wrap">
                  <div className="name">{name}</div>
                  <div className="btn">제휴 확정하기 →</div>
                </div>
                <div className="icon"></div>
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
