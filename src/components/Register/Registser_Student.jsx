import React from 'react'
import Down from '../../assets/img/section/button_donw.svg'

const Registser_Student = () => {
    return (
        <div className="main">
            <h2>제휴 등록하기</h2>
            <div className='kind'>
                <h2>소속명</h2>
                <div>
                    <select>
                        <option value=""></option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className='kind'>
                <h2>희망 혜택</h2>
                <div>
                    <select>
                        <option value=""></option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className='kind'>
                <h2>희망 기간</h2>
                <div>
                    <select>
                        <option value=""></option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className="college">
                <h2>제휴 대상</h2>
                <div>
                    <div>
                        <select>
                            <option value="">OO대학교</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                    <div>
                        <select>
                            <option value="">OO대학</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className='major'>
                    <select>
                        <option value="">OO학과</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className="phone">
                <h2>제휴 인원</h2>
                <input type="text" placeholder='n명' />
            </div>
            <div className="etc">
                <h2>특이사항</h2>
                <input type="text" placeholder='소통, 제휴 경험 등' />
            </div>
            <button>등록하기</button>
        </div>
    )
}

export default Registser_Student