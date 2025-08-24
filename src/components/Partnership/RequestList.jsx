import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import RequestDetail from './RequestDetail'

const RequestList = () => {
    const recieved = ["파도의 숲", "푸른 하늘", "초록 바람", "푸른 바다"]
    const sent = ["파도의 숲", "푸른 하늘", "초록 바람", "푸른 바다"]

    const [selected, setSelected] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const chunkArray = (arr, size) => {
        const chunks = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }

    const recievedPages = chunkArray(recieved, 2)
    const sentPages = chunkArray(sent, 2)

    return (
        <div className='requestlist_wrap'>
            <div className="recieve_wrap">
                <div className="title">받은 요청</div>
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    spaceBetween={12}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    className='list'
                >
                    {recievedPages.map((page, pageIndex) => (
                        <SwiperSlide key={pageIndex}>
                            {page.map((name, idx) => (
                                <div className="button_nomal"
                                    key={idx}
                                    style={{ marginBottom: '12px' }}
                                    onClick={() => setSelected(name)} >
                                    <div className="wrap">
                                        <div className="name">{name}</div>
                                        <div
                                            className="btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowModal(true)
                                            }}
                                        >
                                            제휴 확정하기 →
                                        </div>
                                    </div>
                                    <div className="icon"></div>
                                </div>
                            ))}
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>

            <div className="send_wrap">
                <div className="title">보낸 요청</div>
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    spaceBetween={12}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    className='list'
                >
                    {sentPages.map((page, pageIndex) => (
                        <SwiperSlide key={pageIndex}>
                            {page.map((name, idx) => (
                                <div className="button_nomal" key={idx} style={{ marginBottom: '12px' }}>
                                    <div className="wrap">
                                        <div className="name">{name}</div>
                                        <div className="tag">요청 진행 중</div>
                                    </div>
                                    <div className="icon"></div>
                                </div>
                            ))}
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>


            <RequestDetail name={selected} onClose={() => setSelected(null)} />

            {showModal && (

                <div className="modal">
                    <div className="wrap">
                        <p className='text'>
                            상대방과 연락이 닿았다면, 이 요청을 ‘협의 중’으로 변경할까요?
                        </p>
                        <div className="btns">
                            <div className="btn" onClick={() => setShowModal(false)}>취소</div>
                            <div className="btn check" onClick={() => {
                                setShowModal(false)
                            }}>
                                확인
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default RequestList
