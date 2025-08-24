import React, { useState } from 'react'
import Logo from '../../../assets/img/section/logo.svg'
import Search from '../../../assets/img/section/button_search.svg'
import Exam from '../../../assets/img/section/img_example.png'
import Detail from '../../../assets/img/commons/button_detail.svg'
import { Link } from 'react-router-dom'

const Normal_Detail = () => {
    const [show, setShow] = useState(false);


    return (
        <div className='Normal_Detail_wrap container Login_wrap'>
            <div className="header">
                <Link to='/'>
                    <img src={Logo} alt="" />
                </Link>
                <div></div>
            </div>
            <div className="main">
                <div className="search_wrap">
                    <input type="text" placeholder='업종, 혜택 등을 검색해보세요!' />
                    <button><img src={Search} alt="" /></button>
                </div>
                <p>
                    ‘성신여자대학교 컴퓨터공학과’<br />
                    제휴 매장을 모아보았어요!
                </p>
                <div className="map"></div>
                <div className="store_wrap">
                    <div className="tage_wrap">
                        <button>음식점</button>
                        <button className='click'>카페</button>
                        <button>기타</button>
                    </div>
                    <div className='list_wrap'>
                        <div onClick={() => { setShow(true) }} className="list">
                            <div className="left">
                                <p>카페 나의 우주</p>
                                <p className="tage">제휴 유효 기간 D - 60</p>
                            </div>
                            <button><img src={Detail} alt="" /></button>
                        </div>
                        <div onClick={() => { setShow(true) }} className="list click">
                            <div className="left">
                                <p>카페 나의 우주</p>
                                <p className="tage">제휴 유효 기간 D - 60</p>
                            </div>
                            <button><img src={Detail} alt="" /></button>
                        </div>
                        <div onClick={() => { setShow(true) }} className="list">
                            <div className="left">
                                <p>카페 나의 우주</p>
                                <p className="tage">제휴 유효 기간 D - 60</p>
                            </div>
                            <button><img src={Detail} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
            {show &&
                <div className="detail_pop">
                    <div className="pop">
                        <img src={Exam} alt="" />
                        <h2>론도</h2>
                        <div>
                            <div>
                                <p className="kind">업종</p>
                                <p className='explane'>카페</p>
                            </div>
                            <div>
                                <p className="kind">혜택</p>
                                <p className='explane'>일부 품목 10% 할인</p>
                            </div>
                            <div>
                                <p className="kind">기간</p>
                                <p className='explane'>2025.09.01 - 2026.02.28</p>
                            </div>
                        </div>
                        <div className='btn_box'>
                            <button onClick={() => { setShow(false) }}>확인</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Normal_Detail