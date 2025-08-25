import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import WriteDocx from './WriteDocx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/pagination'
import RequestDetail from './RequestDetail'
import Check from "../../assets/img/commons/button_check.svg"
import Close from "../../assets/img/commons/button_delete.svg"

const ConfirmList = ({ writeId }) => {
    const navigate = useNavigate() 
    const [recieved, setRecieved] = useState([]);
    const [sent, setSent] = useState([]);
    const [end, setEnd] = useState([]);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role").toLowerCase()
    const [selected, setSelected] = useState(null)
    const [reviewTab, setReviewTab] = useState("received")
    const [assiociation, setAssiociation] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/${role}/requests/confirmed`, {
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
                setEnd(res.data.content)

            })
            .catch((err) => {
                console.error("데이터 불러오기 실패:", err)
            })

        const upperRole = role.toUpperCase()
        const oppositeRole = upperRole === "COUNCIL" ? "BOSS" : "COUNCIL"

        axios.get(`${BASE_URL}/associations/papers/council/confirm-waiting`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                requester: oppositeRole,
                page: 0,
                size: 100
            },
        })
            .then((res) => {
                console.log("받은 요청:", res.data)
                setRecieved(res.data.content)
            })
            .catch((err) => console.error("받은 요청 실패:", err))

        axios.get(`${BASE_URL}/associations/papers/council/confirm-waiting`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                requester: upperRole,
                page: 0,
                size: 100
            },
        })
            .then((res) => {
                console.log("보낸 요청:", res.data)
                setSent(res.data.content)
            })
            .catch((err) => console.error("보낸 요청 실패:", err))
    }, [BASE_URL])

    const chunkArray = (arr, size) => {
        const chunks = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }
    const onComfirm = (id) => {
         axios.post(`${BASE_URL}/associations/${id}/confirm`, {
          
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("서버 응답:")
                window.location.reload()

              
                
            })
            .catch((err) => {
                console.error("제휴 수락 실패:", err)
   
            })
    }
     const onReject = (id) => {
         axios.post(`${BASE_URL}/associations/${id}/reject`, {
          
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("서버 응답:")
                window.location.reload()

              
                
            })
            .catch((err) => {
                console.error("제휴 수락 실패:", err)
   
            })
    }
    const recievedPages = chunkArray(recieved, 2)
    const sentPages = chunkArray(sent, 2)
    const endPages = chunkArray(end, 2);
    return (
        <div className='confirmlist_wrap'>
            {writeId && <WriteDocx id={writeId} />}
            {!writeId && (
                <>
                    <div className="end_wrap">
                        <div className="title">확정 완료</div>
                        <Swiper
                            modules={[Pagination]}
                            slidesPerView={1}
                            spaceBetween={12}
                            pagination={{ el: '.swiper-pagination', clickable: true }}
                            className='list'
                        >


                            {endPages.map((page, pageIndex) => (
                                <SwiperSlide key={pageIndex}>
                                    {page.map((item, idx) => (
                                        <div className="button_nomal" key={idx}  style={{ marginBottom: '12px' }}>
                                            <div className="wrap">
                                                <div className="name">{item.storeName}</div>
                                                <div className="btn" onClick={() => navigate(`/partnership/detail/${item.associationId}`)}>최종 협약서 보기 →</div>
                                            </div>
                                        </div>
                                    ))}
                                </SwiperSlide>
                            ))}

                            <div className="swiper-pagination"></div>
                        </Swiper>
                    </div>

                    <div className="review_wrap">
                        <div className="title">검수 요청</div>
                        <div className="btns">
                            <div
                                className={`receieve ${reviewTab === "received" ? "active" : ""}`}
                                onClick={() => setReviewTab("received")}
                            >
                                받은 요청
                            </div>
                            <div
                                className={`send_btn ${reviewTab === "sent" ? "active" : ""}`}
                                onClick={() => setReviewTab("sent")}
                            >
                                보낸 요청
                            </div>
                        </div>

                        <Swiper
                            modules={[Pagination]}
                            slidesPerView={1}
                            spaceBetween={12}
                            pagination={{ el: '.swiper-pagination', clickable: true }}
                            className='list'
                        >
                            {(reviewTab === "received" ? recievedPages : sentPages).map((page, pageIndex) => (
                                <SwiperSlide key={pageIndex}>
                                    {page.map((item, idx) => (
                                        <div className="button_nomal" key={idx} style={{ marginBottom: '12px' }}>
                                            <div className="wrap">
                                                <div className="name">{item.storeName}</div>
                                                <div className="btn"  onClick={() => navigate(`/partnership/detail/${item.associationId}`)} >최종협약서 바로가기 →</div>
                                            </div>
                                            {reviewTab === "received" && (
                                                <div className="btns">
                                       
                                                    <div className="okay" onClick={() => {onComfirm(item.associationId)}}>
                                                        <img src={Check} alt="" />
                                                    </div>
                                                    <div className="no" onClick={() => {onReject(item.associationId)}}>
                                                        <img src={Close} alt="" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </SwiperSlide>
                            ))}
                            <div className="swiper-pagination"></div>
                        </Swiper>
                    </div>

                </>
            )}
        </div>
    )
}

export default ConfirmList
