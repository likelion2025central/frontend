import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import Back from "../../assets/img/commons/arrow.svg"
import CheckOff from "../../assets/img/commons/button_check_off.svg"
import CheckOn from "../../assets/img/commons/button_check.svg"
import Loading from './Loading'

const RegPart = () => {
    const items = [
        ["카페", "전품목 10%", "공과대학"],
        ["식당", "학생증 제시 시 20%", "인문대학"],
        ["카페", "전품목 10%", "공과대학"],
        ["식당", "학생증 제시 시 20%", "인문대학"],
        ["카페", "전품목 10%", "공과대학"],
        ["식당", "학생증 제시 시 20%", "인문대학"]
    ]

    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const pages = []
    for (let i = 0; i < items.length; i += 3) {
        pages.push(items.slice(i, i + 3))
    }

    return (
        <div className='regpart_wrap container'>
            <div className="hd">
                <div className="b_btn" onClick={() => navigate(-1)}>
                    <img src={Back} alt="" />
                </div>
                등록한 제휴 관리하기
            </div>

            <div className="list_wrap">
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    pagination={{
                        el: '.swiper-pagination',
                        clickable: true,
                    }}
                >
                    {pages.map((pageItems, pageIndex) => (
                        <SwiperSlide key={pageIndex}>
                            <div className="slide_inner">
                                {pageItems.map((list, i) => {
                                    const itemIndex = pageIndex * 3 + i
                                    return (
                                        <div
                                            className="item"
                                            key={i}
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
                                                    {list.map((val, idx) => (
                                                        <div className="list_item" key={idx}>{val}</div>
                                                    ))}
                                                </div>
                                                <div className="line" />
                                                <div className="btns">
                                                    <Link to="/management/currentpartner">현재 확정된 제휴 →</Link>
                                                    <Link to="/management/editdocx">조건 수정 →</Link>
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
            </div>

            <div className="button_nomal" onClick={() => setLoading(true)}>
                AI 매칭하기
            </div>
            {loading &&
                <Loading Loading={loading}/>}

        </div>
    )
}

export default RegPart
