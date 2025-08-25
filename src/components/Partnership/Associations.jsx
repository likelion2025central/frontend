import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dropdown from "../../assets/img/commons/arrow.svg"
import Calendar from "../../assets/img/manage/calendar.svg"
import Arrow from "../../assets/img/commons/arrow.svg"
import axios from 'axios'

const Associations = () => {
    const navigate = useNavigate()
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [activeIndex, setActiveIndex] = useState(2)
    const tabs = ["제휴 요청", "협의 중", "제휴 확정"]

    const handleTabClick = (index) => {
        navigate("/partnership")
        setActiveIndex(index)
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/associations/papers/by-association/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => {
                console.log("서버 응답:", res.data);
                setContent(res.data) // content 대신 그냥 res.data 바로
            })
            .catch((err) => {
                console.error("데이터 불러오기 실패:", err)
            })
    }, [id, BASE_URL, token])

    return (
        <div className='setconfirm_wrap container'>
            <div className="hd">
                <img src={Arrow} alt="" className="b_btn" onClick={() => navigate(-1)} />
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

            <div className="content">
                <div className="title">최종 제휴 협약서</div>

                <div className="form">
                    <div className="table">
                        <p className='text'>학생회 소속</p>
                        <div className="box">
                            <div className="dropdown">{content?.councilInfo || "학생회 소속 표시"}</div>
                        </div>
                    </div>

                    <div className="table">
                        <p className='text'>상호명</p>
                        <div className="box">
                            <div className="dropdown">{content?.storeName || "상호명 표시"}</div>
                        </div>
                    </div>

                    <div className="table">
                        <p className='text'>혜택</p>
                        <div className="box">
                            <div className="dropdown">{content?.boon || "혜택 표시"}</div>
                        </div>
                    </div>

                    <div className="table">
                        <p className='text'>기간</p>
                        <div className="box">
                            <div className="date dropdown">
                                {content ? `${content.startDate} ~ ${content.endDate}` : "기간 표시"}
                            </div>
                            <img src={Calendar} alt="" className="icon" />
                        </div>
                    </div>

                    <div className="note selection">
                        <p className='text'>특이사항</p>
                        <div className="box">{content?.note || "소통, 제휴 경험 등 표시"}</div>
                    </div>

                    <div className="selection target">
                        <p className='text'>제휴 대상</p>
                        <div className="wrap">
                            <div className="dropdown-box box">
                                <div className="dropdown">
                                    <p>{content?.targetSchool || "OO대학교"}</p>
                                    <img src={Dropdown} alt="" className="icon" />
                                </div>
                            </div>
                            <div className="dropdown-box box">
                                <div className="dropdown">
                                    <p>{content?.targetCollege || "OO단과대학"}</p>
                                    <img src={Dropdown} alt="" className="icon" />
                                </div>
                            </div>
                            <div className="dropdown-box box">
                                <div className="dropdown">
                                    <p>{content?.targetDepartment || "OO학과"}</p>
                                    <img src={Dropdown} alt="" className="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Associations
