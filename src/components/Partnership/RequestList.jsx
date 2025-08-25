import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import RequestDetail from './RequestDetail'
import axios from 'axios'

const RequestList = () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const navigate = useNavigate()
    const [recieved, setRecieved] = useState([])
    const [sent, setSent] = useState([])
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")?.toLowerCase()
    const [selected, setSelected] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const chunkArray = (arr, size) => {
        const chunks = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/${role}/sent/waiting`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 0, size: 100 },
        })
            .then((res) => {
                console.log("보낸 요청 응답:", res.data)
                setSent(res.data.content || [])
            })
            .catch((err) => console.error("보낸 요청 실패:", err))

        axios.get(`${BASE_URL}/${role}/received/waiting`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 0, size: 100 },
        })
            .then((res) => {
                console.log("받은 요청 응답:", res.data)
                setRecieved(res.data.content || [])
            })
            .catch((err) => console.error("받은 요청 실패:", err))
    }, [BASE_URL, role, token, showModal])

    const recievedPages = chunkArray(recieved, 2)
    const sentPages = chunkArray(sent, 2)

    const onContact = () => {
         axios.post(`${BASE_URL}/associations/${showModal}/negotiate`, {
          
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("서버 응답:", res.data)
                setShowModal(false);
                
            })
            .catch((err) => {
                console.error("제휴 요청 실패:", err)
   
            })
    }

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
                            {page.map((item, idx) => (
                                <div
                                    className="button_nomal"
                                    key={item.associationId || idx}
                                    style={{ marginBottom: '12px' }}
                                    onClick={() => setSelected(item)}
                                >
                                    <div className="wrap">
                                        <div className="name">
                                            {role === "council"
                                                ? item.storeName
                                                : `${item.schoolName} ${item.college} ${item.department}`}
                                        </div>
                                        <div
                                            className="btn"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setShowModal(item.associationId)
                                            }}
                                        >
                                            협의 시작하기 →
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
                            {page.map((item, idx) => (
                                <div
                                    className="button_nomal"
                                    key={item.associationId || idx}
                                    style={{ marginBottom: '12px' }}
                                    onClick={() => setSelected(item)}
                                >
                                    <div className="wrap">
                                        <div className="name">
                                            {role === "council"
                                                ? item.storeName
                                                : `${item.schoolName} ${item.college} ${item.department}`}
                                        </div>
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

            <RequestDetail item={selected} role={role} onClose={() => setSelected(null)} />

            {showModal && (
                <div className="modal">
                    <div className="wrap">
                        <p className='text'>
                            상대방과 연락이 닿았다면,<br /> 이 요청을 ‘협의 중’으로 변경할까요?
                        </p>
                        <div className="btns">
                            <div className="btn" onClick={() => setShowModal(false)}>취소</div>
                            <div className="btn check" onClick={() => onContact()}>확인</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RequestList
