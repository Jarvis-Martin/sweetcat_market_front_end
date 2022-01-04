import React, { useEffect, useRef, useState } from 'react'
import './home.css';
import { useHistory } from 'react-router';
import { Carousel } from 'antd';
import {
  new_Goods_Page_URL,
  Exquisit_Good_Page_URL,
  Second_Kill_Page_URL,
  Search_Page_URL,
  Activity_Detail_Page_URL
} from '../../utils/PageUrl';
import TitleBar from '../../components/title_bar/TitleBar';
import Tabbar from '../../components/tabbar/Tabbar';
import SearchBar from '../../components/search_bar/SearchBar';
import TopicPanel from '../../components/topic_panel/TopicPanel';
import RecommendTopic from '../../components/recommend_topic/RecommendTopic';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import { getScrollInstane } from '../../utils/BetterScroll';
import RestTemple from '../../network/network';
import { CMS_ACTIVITY_BASEURL, CMS_CAROUSEL_BASEURL, GOOD_EXQISIT_BASEURL, GOOD_NEW_BASEURL } from '../../network/network_constant';
import { GET, POST } from '../../network/request_methods';

export default function Home() {
  const history = useHistory()
  const icon_loading = require('../../assets/icon_loading.png').default
  const home_ref = useRef()
  const [restClient, setRestClient] = useState(new RestTemple())
  const [carouselList, setCarouselList] = useState()
  const [activityList, setActivityList] = useState()
  // 新品上市
  const [newGoodList, setNewGoodList] = useState()
  const [newGoodListPage, setnewGoodListPage] = useState(0)
  // 一周严选
  const [strictPage, setStrictPage] = useState(0)
  const [newGustLikeListPage, setnewGustLikeListPage] = useState(0)

  const getData = (method, path, requestConfig) => {
    return new Promise((resolve, reject) => {
      switch (method) {
        case GET: {
          restClient.get(path, requestConfig).then(result => resolve(result)).catch(err => reject(err));
          break
        }
        case POST: {
          restClient.post(path, requestConfig).then(result => resolve(result)).catch(err => reject(err));
          break
        }
      }
    })
  }
  const refreshData = (method, path, limit, page) => {
    return getData(method, path, {
      params: {
        '_limit': limit,
        '_page': page
      }
    })
  }
  useEffect(() => {

    const home_scroller = getScrollInstane(home_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    /**
     * 右侧商品区，上拉加载更多
     */
    home_scroller.on('pullingUp', () => {
      home_scroller.finishPullUp()
    })

    // 加载轮播图数据
    getData(GET, CMS_CAROUSEL_BASEURL, {}).then((result) => {
      setCarouselList(result.data.carousel)
    });
    // 加载活动列表
    getData(GET, CMS_ACTIVITY_BASEURL, {}).then((result) => {
      setActivityList(result.data.activity_list)
    });
    // 新品上市
    getData(GET, GOOD_NEW_BASEURL, {
      params: {
        "_page": 0,
        '_limit': 3
      }
    }).then((result) => {
      setNewGoodList(result.data.commodities)
    });
    // 一周严选
    getData(GET, GOOD_EXQISIT_BASEURL, {
      params: {
        "_page": 0,
        '_limit': 3
      }
    }).then((result) => {
      setStrictPage(result.data.commodities)
    });
    // 猜你喜欢
    // getData(GET, GOOD_EXQISIT_BASEURL, {
    //   params: {
    //     "_page": 0,
    //     '_limit': 3
    //   }
    // }).then((result) => {
    //   setStrictPage(result.data.commodities)
    // });
  }, [])

  const bannerStyle = {
    width: '345px',
    height: '150px',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: '12px',
  };

  const activityStyle = {
    width: '345px',
    height: '110px',
    borderRadius: '6px',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
  };

  const features = [
    '正品保障',
    '品牌直供',
    '售后无忧',
    '教练推荐',
  ]

  const hotSearchKeyWord = [
    '乳清蛋白',
    '筋膜枪',
    '增肌粉',
    '增肌粉'
  ]

  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params) => {
    return e => {
      e.stopPropagation()
      history.push(path, params)
    }
  }

  return (
    <div id='home'>
      <div className="title_bar">
        <TitleBar title='蓝胖子甜品屋' />
      </div>
      <div className="fake_title_bar" />
      {/* 轮播图区域 */}
      <div className="home_scroll" ref={home_ref}>
        <div className="home_scroll_wrapper">
          <div className="banner_container">
            <div className="carousel">
              <Carousel autoplay={carouselList ? true : false} dots={{ className: 'carousel_dots' }}>
                {
                  carouselList ? (
                    carouselList.map((carousel, idx) => {
                      return (
                        <div className='banner_item' key={'carousel' + carousel.picId}>
                          <img src={carousel.picPath} style={bannerStyle} />
                        </div>
                      )
                    })
                  ) : (
                    <div className='carousel_icon_loding_container'>
                      <img src={icon_loading} className={`carousel_icon_loding ${carouselList ? '' : 'loading_circle'}`} />
                    </div>
                  )
                }
              </Carousel>
            </div>
            {/* 商品特性描述 */}
            <div className="features">
              {
                features.map((feature, idx) => {
                  return (
                    <div className="feature" key={idx}>
                      {feature}
                    </div>
                  )
                })
              }
            </div>
            {/* 搜索栏 */}
            <SearchBar />
            {/* 热门搜索关键词提示区 */}
            <div className="hot_search_keyword">
              <div className="title">热门搜索:</div>
              {
                hotSearchKeyWord.map((keyword, idx) => {
                  return (
                    <div className="keyword" key={idx} onClick={navigate2(Search_Page_URL, { keyword })}>{keyword}</div>
                  )
                })
              }
            </div>
          </div>
          {/* 主内容区 */}
          <div className="content_section">
            <div className="content_main">
              {/* 新品上市 */}
              <div className="topic">
                <TopicPanel title='新品上市'
                  refreshDataFunction={() => {
                    refreshData(GET, GOOD_NEW_BASEURL, 3, newGoodListPage + 1)
                      .then((result) => {
                        setNewGoodList(result.data.good_list)
                        setnewGoodListPage(newGoodListPage + 1)
                      });
                  }}
                  path={GOOD_NEW_BASEURL}
                  show_footer='1'
                  navigate_target_url={new_Goods_Page_URL}
                  GoodList={newGoodList} />
              </div>
              {/* 限时秒杀 */}
              <div className="topic">
                <TopicPanel title='限时秒杀' navigate_target_url={Second_Kill_Page_URL} />
              </div>
              {/* 一周严选 */}
              <div className="topic" style={{ marginBottom: '25px' }}>
                <TopicPanel title='一周严选'
                  refreshDataFunction={() => {
                    refreshData(GET, GOOD_EXQISIT_BASEURL, 3, newGoodListPage + 1)
                      .then((result) => {
                        setNewGoodList(result.data.good_list)
                        setnewGoodListPage(newGoodListPage + 1)
                      });
                  }}
                  path={GOOD_NEW_BASEURL}
                  show_footer='1'
                  navigate_target_url={Exquisit_Good_Page_URL}
                  GoodList={newGoodList} />
              </div>
              {/* 官方活动 */}
              <div className="activity_section topic">
                <div className="activity_section_container">
                  <Carousel autoplay={activityList ? true : false} dots={{ className: 'carousel_dots' }}>
                    {
                      activityList ? (
                        activityList.map((activity, idx) => {
                          return (
                            <div className='activity_small_pic_container' key={'activity' + activity.picId}>
                              <img src={activity.picSmall}
                                className='activity_small_pic'
                                style={activityStyle}
                                onClick={navigate2(Activity_Detail_Page_URL, { "activityId": activity.activityId })} />
                            </div>
                          )
                        })
                      ) : (
                        <div className='activity_icon_loding_container'>
                          <img src={icon_loading} className={`activity_icon_loding ${carouselList ? '' : 'loading_circle'}`} />
                        </div>
                      )
                    }
                  </Carousel>
                  {/* <Carousel autoplay>
                    <div className='banner_item' onClick={navigate2(Activity_Detail_Page_URL)}>
                      <img src={icon_loading} style={activityStyle} />
                    </div>
                  </Carousel> */}
                </div>
              </div>
              {/* 金牌推荐 */}
              <div>
                <RecommendTopic title='金牌推荐' show_footer='1' />
              </div>
              {/* 精品推荐 */}
              <div className="topic">
                <GoodRecommendTopic title='精品推荐' show_footer='1' />
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="tabbar_container">
        <Tabbar />
      </div>
    </div >
  )
}
