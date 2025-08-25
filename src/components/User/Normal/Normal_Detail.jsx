import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/img/section/logo.svg";
import Search from "../../../assets/img/section/button_search.svg";
import Detail from "../../../assets/img/commons/button_detail.svg";
import axios from "axios";

const Normal_Detail = () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const jsKey = process.env.REACT_APP_KAKAO_JAVA_API_KEY;
    const params = useParams();

    const [show, setShow] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [cate, setCate] = useState("");
    const [list, setList] = useState([]);
    const [map, setMap] = useState(null);

 
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${jsKey}&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 5,
                };
                const createdMap = new window.kakao.maps.Map(container, options);
                setMap(createdMap);
            });
        };
    }, [jsKey]);

    const onSearch = () => {
        axios
            .get(`${baseURL}/normal/confirmed-active/search`, {
                params: {
                    school: params.college,
                    college: params.faculty,
                    department: params.major,
                    keyWord: keyword,
                    page: 0,
                    size: 10,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setList(res.data.content);
                }
            })
            .catch((err) => console.log(err));
    };

    const onCate = (category) => {
        setCate(category);
        axios
            .get(`${baseURL}/normal/confirmed-active/search`, {
                params: {
                    school: params.college,
                    college: params.faculty,
                    department: params.major,
                    cate: category,
                    page: 0,
                    size: 10,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setList(res.data.content);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        onSearch();
    }, [params]);

    useEffect(() => {
        if (map && list.length > 0) {
            const ps = new window.kakao.maps.services.Places();
            const bounds = new window.kakao.maps.LatLngBounds();

            list.forEach((item) => {
                ps.keywordSearch(item.storeName, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const { x, y } = data[0];
                        const position = new window.kakao.maps.LatLng(y, x);

                        // CustomOverlay 생성
                        const content = `
                        <div class="marker-wrap">
                        <div class="kakao-marker">
                            ${item.storeName}
                        </div>
                        <div class="marker"></div>
                        </div>
                    `;
                        const customMarker = new window.kakao.maps.CustomOverlay({
                            map,
                            position,
                            content,
                            yAnchor: 1,
                        });

                        // 클릭 시 InfoWindow
                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;font-size:12px;">${item.storeName}</div>`,
                        });

                        // CustomOverlay 클릭 이벤트
                        window.kakao.maps.event.addListener(customMarker, "click", () => {
                            infowindow.open(map, customMarker);
                        });

                        // 지도 bounds 확장
                        bounds.extend(position);
                        map.setBounds(bounds);
                    }
                });
            });
        }
    }, [map, list]);


    return (
        <div className="Normal_Detail_wrap container Login_wrap">
            <div className="header">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="main">
                <div className="search_wrap">
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text"
                        placeholder="업종, 혜택 등을 검색해보세요!"
                    />
                    <button onClick={onSearch}>
                        <img src={Search} alt="" />
                    </button>
                </div>
                <p>
                    ‘{params.college} {params.major}’ <br />
                    제휴 매장을 모아보았어요!
                </p>

                <div
                    id="map"
                    style={{ width: "100%", height: "400px", borderRadius: "12px" }}
                ></div>

                <div className="store_wrap">
                    <div className="tage_wrap">
                        <button
                            className={cate === "음식점" ? "click" : ""}
                            onClick={() => onCate("음식점")}
                        >
                            음식점
                        </button>
                        <button
                            className={cate === "카페" ? "click" : ""}
                            onClick={() => onCate("카페")}
                        >
                            카페
                        </button>
                        <button
                            className={cate === "기타" ? "click" : ""}
                            onClick={() => onCate("기타")}
                        >
                            기타
                        </button>
                    </div>

                    <div className="store_wrap">
                        <div className="list_wrap">
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
                                        <button
                                            onClick={() => {
                                                setSelectedStore(item);
                                                setShow(true);
                                            }}
                                        >
                                            <img src={Detail} alt="" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {show && selectedStore && (
                    <div className="detail_pop">
                        <div className="pop">
                            <img src={selectedStore.imgUrl} alt="" />
                            <h2>{selectedStore.storeName}</h2>
                            <div>
                                <div>
                                    <p className="kind">업종</p>
                                    <p className="explane">{selectedStore.targetDepartment}</p>
                                </div>
                                <div>
                                    <p className="kind">혜택</p>
                                    <p className="explane">{selectedStore.boon}</p>
                                </div>
                                <div>
                                    <p className="kind">기간</p>
                                    <p className="explane">
                                        {selectedStore.startDate} - {selectedStore.endDate}
                                    </p>
                                </div>
                            </div>
                            <div className="btn_box">
                                <button
                                    onClick={() => {
                                        setShow(false);
                                        setSelectedStore(null);
                                    }}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Normal_Detail;
