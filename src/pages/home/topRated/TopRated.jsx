import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/UseFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated= ()=> {

    // const [endPoint, setEndPoint] = useState("day")
    const [showType, setshowType] = useState("movie")

    const {data, loading} = useFetch(`/${showType}/top_rated`)

    const onTabChange=(tab)=>{
      setshowType(tab === "Movie" ? "movie" : "tv")
    }

  return (
    <div className='carouselSction'>
        <ContentWrapper>
            <span className="carouselTittle">All Time Best</span>
            <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading= {loading} endPoint={showType}/>
    </div>
  )
}

export default TopRated