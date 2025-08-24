import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link, useParams } from 'react-router-dom'
import Logo from '../../../assets/img/section/logo.svg'
import Search from '../../../assets/img/section/button_search.svg'
import Exam from '../../../assets/img/section/img_example.png'
import Detail from '../../../assets/img/commons/button_detail.svg'
import axios from 'axios'

const Normal_Detail = () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    const params = useParams();
    const [show, setShow] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [keyword, setKeyword] = useState('')
    const [cate, setCate] = useState('')
    const [list, setList] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);

    const containerStyle = {
        width: '100%',
        height: 'inherit',
        borderRadius: '12px'
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => console.log(err)
            );
        } else {
            alert("위치 정보를 사용할 수 없습니다.");
        }
    }, []);

    const center = {
        lat: 37.59165365,
        lng: 127.0221474,
    };

    const onSearch = () => {
        axios.get(`${baseURL}/normal/confirmed-active/search`, {
            params: {
                school: params.college,
                college: params.faculty,
                department: params.major,
                keyWord: '',
                page: 0,
                size: 3,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setList(res.data.content)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onCate = () => {
        axios.get(`${baseURL}/normal/confirmed-active/search`, {
            params: {
                school: params.college,
                college: params.faculty,
                department: params.major,
                cate: cate,
                page: 0,
                size: 3,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setList(res.data.content)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        onSearch()
    }, [params])

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
                    <input value={keyword} onChange={(e) => { setKeyword(e.target.value) }} type="text" placeholder='업종, 혜택 등을 검색해보세요!' />
                    <button onClick={() => { onSearch() }}><img src={Search} alt="" /></button>
                </div>
                <p>
                    ‘성신여자대학교 컴퓨터공학과’<br />
                    제휴 매장을 모아보았어요!
                </p>
                <div className="map">
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                        >
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="store_wrap">
                    <div className="tage_wrap">
                        <button className={cate === '음식점' ? 'click' : ''} onClick={() => { setCate('음식점'); onCate(); }}>음식점</button>
                        <button className={cate === '카페' ? 'click' : ''} onClick={() => { setCate('카페'); onCate(); }}>카페</button>
                        <button className={cate === '기타' ? 'click' : ''} onClick={() => { setCate('기타'); onCate(); }}>기타</button>
                    </div>
                    <div className='list_wrap'>
                        {list.map((item, key) => {
                            const today = new Date();
                            const endDate = new Date(item.endDate);
                            const diffTime = endDate - today;
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            return (
                                <div key={key} className="list">
                                    <div className="left">
                                        <p>{item.storeName}</p>
                                        <p className="tage">제휴 유효 기간 D-{diffDays}</p>
                                    </div>
                                    <button onClick={() => {
                                        setSelectedStore(item);
                                        setShow(true);
                                    }}>
                                        <img src={Detail} alt="" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {show && selectedStore &&
                <div className="detail_pop">
                    <div className="pop">
                        <img src={selectedStore.imgUrl} alt="" />
                        <h2>{selectedStore.storeName}</h2>
                        <div>
                            <div>
                                <p className="kind">업종</p>
                                <p className='explane'>{selectedStore.targetDepartment}</p>
                            </div>
                            <div>
                                <p className="kind">혜택</p>
                                <p className='explane'>{selectedStore.boon}</p>
                            </div>
                            <div>
                                <p className="kind">기간</p>
                                <p className='explane'>
                                    {selectedStore.startDate} - {selectedStore.endDate}
                                </p>
                            </div>
                        </div>
                        <div className='btn_box'>
                            <button onClick={() => { setShow(false); setSelectedStore(null); }}>확인</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Normal_Detail